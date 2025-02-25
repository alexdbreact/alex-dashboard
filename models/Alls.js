import mongoose, { Schema } from 'mongoose';
const topicSchema = new Schema(
  {
    titles: {
    type: String,
    required: [true, 'Please provide the book title.'],
  },
  place: {
    type: String,
    required: [true, 'Please provide the book author.'],
  },
  tashera: {
    type: String,
  },
  image: {
    type: String,
  },
  files: {
    name: { type: String },
    type: { type: String },
    base64: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  details: {
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

const Alls = mongoose.models.All || mongoose.model('All', topicSchema);

export default Alls
