import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleWare/auth.js";
// import { errorMiddleware } from "./middleWare/error.js";
import cors from "cors";
export const app=express();
config({
    path:"./data/config.env"
 })
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin:[process.env.FRONTEND_URL],
//     methods:["GET","POST","PUT","POST","DELETE"],
//     credentials:true,
// }))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api/v1/user",userRouter)
// app.use("/api/v1/task",isAuthenticated,taskRouter)
app.use("/api/v1/task",taskRouter)
app.get("/",(req,res)=>{
    res.send("nice")
 })


//  app.use(errorMiddleware);