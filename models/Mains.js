import mongoose, { Schema } from 'mongoose';
const topicSchema = new Schema(
  {
    tit: {
    type: String,
    required: [true, 'Please provide the book title.'],
  },
  start: {
    type: String,
    required: [true, 'Please provide the book author.'],
  },
  tash: {
    type: String,
    required: [true, 'Please provide the book author.'],
  },
  image: {
    type: String,
  },
  imagex: {
    type: String,
  },
  files: {
    name: { type: String },
    type: { type: String },
    base64: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  filesx: {
    name: { type: String },
    type: { type: String },
    base64: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  summ: {
    type: String,
  },
  start2: {
    type: String,
  },
  tash2: {
    type: String,
  },
  start3: {
    type: String,
  },
  tash3: {
    type: String,
  },
  comment: {
    type: String,
  },
  refer: {
    type: String,
  },
},
{
    timestamps: true
}
);

const Mains = mongoose.models.Main || mongoose.model('Main', topicSchema);

export default Mains