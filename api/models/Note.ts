import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);