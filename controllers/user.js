import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utills/features.js";
import ErrorHandler from "../middleWare/error.js";

// register---------------------------------
export const register=async(req,res,next)=>{
    try{
  const {name,email,password}=req.body;
  let user= await User.findOne({email});
  if(user)return next(new ErrorHandler("User alredy existed",400))
  const hasedPassword=await bcrypt.hash(password,10);
  user=await User.create({name,email,password:hasedPassword});
  setCookie(user,res,"Registered successfully",201); 
    } catch(error){
      next(error)
    }
}

// login-------------------------------
export const login=async(req,res,next)=>{
    try{
      const {email,password} =req.body;
      const user=await User.findOne({email}).select("+password"); // select ("+password") because we define in schema password select false so it not select password so manualy select password
      if(!user)return next(new ErrorHandler("Invalid Email",400))
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch)return next(new ErrorHandler("Invalid Password",400))
     setCookie(user,res,`Welcome Back, ${user.name}`,200)
    }catch(error){
      next(error)
    }
}
