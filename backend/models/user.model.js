import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ['Student', 'Recruiter'],
      default: 'Student',
    },
    profile: {
      bio: { type: String, default: '' },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String, default: '' },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
      profilePhoto: { type: String, default: '', required: false },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
