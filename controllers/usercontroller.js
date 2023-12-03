import AppError from "../utils/appError.js";
import { HttpStatus } from "../config/httpStatus.js";
import User from "../databse/models/userModel.js";

export const usercontroller = ()=>{
const adduser = async(req,res,next)=>{
    try{
        console.log(req.body);
 const {username,password,email}= req.body

 if(!username || !password || !email){
    const err = new AppError("missing credentials",HttpStatus.BAD_REQUEST)
    return next(err)
 }
 const existingUser = await User.findOne({ email: email });
 if(existingUser){
    const err =new AppError("user already exist",HttpStatus.BAD_REQUEST)
    return next(err)
 }
 // adding new user
 const newuser = await User.create({
    username,
    password,
    email
 })
 res.status(HttpStatus.CREATED).json({messege :"user adder successfully",newuser})
    }catch(error){
console.log(error);
res.status(HttpStatus.INTERNAL_SERVER_ERROR)
.json({messege:"Internal server Error"+error})
    }
}
return{
    adduser
}
}
