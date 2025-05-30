import  mongoose  from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:"station",
    }).then((c)=>console.log(`database connect,${process.env.DB_URL}`)).catch((e)=>console.log(e))
}