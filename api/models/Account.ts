import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Account', accountSchema);