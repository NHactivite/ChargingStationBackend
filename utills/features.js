import jwt from "jsonwebtoken";

export const setCookie=(user,res,message,statuscode=200)=>{
    const token= jwt.sign({_id:user._id},process.env.JWT_SECRET);

 res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:  "lax" ,
        // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        // secure: process.env.NODE_ENV === "Development" ? false : true,
        secure: false 
 }).json({
    success:true,
    message,
 })
}