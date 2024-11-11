import mongoose, { Connection } from "mongoose";

let isConnected:Connection | boolean = false;
const connectDB = async()=>{
    if(isConnected){
        console.log("Db already connected")
        return isConnected;
    }
    try{

      const res = await mongoose.connect(process.env.MONGO_URI!);
      isConnected = res.connection;
      console.log("DB connected successfully")
      return isConnected
    }catch(err){
        console.log(err);
    }
}

export default connectDB;
