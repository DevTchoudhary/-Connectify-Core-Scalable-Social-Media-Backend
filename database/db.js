const mongoose=require("mongoose");




const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected!");
    }
    catch(error){
      console.log(error.message+"Database is not connected");
    }
}


module.exports=connectDB;