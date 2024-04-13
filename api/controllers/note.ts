import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Note from '../models/Note';

export const addNote = async (req: Request, res: Response) => {

    try {
        // Input validation
        await body('title')
            .isLength({ min: 1 })
            .withMessage('Title is required.')
            .trim()
            .run(req);

        await body('content')
            .isLength({ min: 1 })
            .withMessage('Content is required.')
            .trim()
            .run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { title, content } = req.body;

        const newNote = new Note({
            title: title,
            content: content,
            userId: (req as any).user.id as mongoose.Types.ObjectId
        });

        const note = await newNote.save();

        return res.status(201).json({
            message: 'Note added',
            note: note
        });
    } catch (error) {
        return res.status(500).json({ message: 'Could not add note at the moment!' });
    }
};

export const getNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found!' });
        }
        if ((req as any).user.id as string !== note.userId.toString()) {
            return res.status(401).json({ message: 'You can only view your own note!' });
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Could not get note at the moment!' });
    }
}

export const getNotes = async (req: Request, res: Response) => {
    try {
        if ((req as any).user.id as string !== req.params.userId) {
            return res.status(401).json({ message: 'You can only view your own notes!' });
        }
        const limit: number = parseInt(req.query.limit as string) || 10;
        const startIndex: number = parseInt(req.query.startIndex as string) || 0;

        const searchTerm: string = req.query.searchTerm as string || '';

        const sortField: string = req.query.sort as string || 'updatedAt';
        const sortOrder: 'asc' | 'desc' = req.query.order === 'asc' ? 'asc' : 'desc';

        const sortOptions: { [key: string]: 'asc' | 'desc' } = {};
        sortOptions[sortField] = sortOrder;

        const notes = await Note.find({
            title: { $regex: searchTerm, $options: 'i' },
            userId: req.params.userId
        }).sort(sortOptions).limit(limit).skip(startIndex);
        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: 'No Note found!' });
        }
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while fetching notes.' });
    }
}

export const updateNote = async (req: Request, res: Response) => {
    // Input validation
    await body('title')
        .isLength({ min: 1 })
        .withMessage('Title is required.')
        .trim()
        .run(req);

    await body('content')
        .isLength({ min: 1 })
        .withMessage('Content is required.')
        .trim()
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found!' });
    }

    if ((req as any).user.id as string !== note.userId.toString()) {
        return res.status(401).json({ message: 'You can only update your own note!' });
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            },
            { new: true }
        );
        return res.status(200).json({
            message: 'Note Updated!',
            updatedNote: updatedNote
        });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred!' });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found!' });
    }

    if ((req as any).user.id as string !== note.userId.toString()) {
        return res.status(401).json({ message: 'You can only delete your own note!' });
    }

    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json("Note has been deleted!");
    } catch (error) {
        return res.status(500).json({ message: 'Error while deleting!' });
    }
};