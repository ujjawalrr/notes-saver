import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import Account from '../models/Account';
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    // Input validation
    await body('email')
      .isEmail()
      .withMessage('Please provide a valid email address!')
      .normalizeEmail()
      .run(req);

    await body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long!')
      .trim()
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Credentials validation
    const { email, password } = req.body;
    const account = await Account.findOne({ email });

    if (!account) {
      return res.status(404).json({ message: 'Account not found!' });
    }

    if (!(await bcryptjs.compare(password, account.password))) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET as string);
    return res
      .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
      .status(200)
      .json({
        message: 'Logged in successfully!',
        account: {
          _id: account._id,
          username: account.username,
          email: account.email
        }
      });
  } catch (error) {
    return res.status(500).json({ message: 'Try logging in again!' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('access_token');
  return res.status(200).json({ message: 'Logged out successfully!' });
};

export const register = async (req: Request, res: Response) => {
  try {
    // Input validation
    await body('email')
      .isEmail()
      .withMessage('Please provide a valid email address.')
      .normalizeEmail()
      .run(req);

    await body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .trim()
      .run(req);

    await body('username')
      .isLength({ min: 1 })
      .withMessage('Username is required.')
      .trim()
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password, username } = req.body;
    const existingAccount = await Account.findOne({ email });

    if (existingAccount) {
      return res.status(400).json({ message: 'Email already registered!' });
    }

    const hash = await bcryptjs.hash(password, 10);
    const newAccount = new Account({
      email: email,
      username: username,
      password: hash
    });

    const account = await newAccount.save();

    const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET as string);
    return res
      .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
      .status(201)
      .json({
        message: 'Account created!',
        account: {
          _id: account._id,
          email: account.email,
          username: account.username
        }
      });
  } catch (error) {
    return res.status(500).json({ message: 'Error while creating an account!' });
  }
};
