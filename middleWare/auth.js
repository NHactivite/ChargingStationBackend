import jwt from "jsonwebtoken"
import { User } from "../models/userSchema.js";
import ErrorHandler from "./error.js";
export const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token) return next(new ErrorHandler("Authentication required", 401, "NO_TOKEN"))
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded._id);
    next(); 
}