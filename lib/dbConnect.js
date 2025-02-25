import mongoose from 'mongoose';

const MONGODB_URL = "mongodb+srv://eduosamaz:PublicRelation@pr.wparq.mongodb.net/PublicRelation?retryWrites=true&w=majority&appName=PR";



const dbConnect = async () => {
 try{
  await mongoose.connect(MONGODB_URL);
  console.log("connected");


 }catch(error){
  console.log(error);
 }

};

export default dbConnect
