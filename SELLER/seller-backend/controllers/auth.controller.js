import User from "../mongodb/model/singup.User.Model.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
{/*register*/}

export const Signup = async (req,res)=>{
  try {
    const {name,email,phone,password}=req.body;
    if(!name || !email || !phone || !password){
      return res.status(400).json({message:"Please provide all fields"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bycrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        phone,
        password:hashedPassword
    })
  } catch (error) {
    console.error("Signup error:", err.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
}
  
{/*login*/}

export const Login = async (req,res) =>{
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({message:"Please provide email and password"});
    }
    const User = await User.findOne({email}).select("+password");
    if(!User){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatch = await User.bycrypt.compare(password,User.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const token = gwt.sign({
      id:User._id,
      email:User.email
    },process.env.JWT_SECRET,{
      expiresIn:"1d"
    })
    res.status(200).json({message:"Login successful",token});
  } catch (error) {
    console.error("Login error:", err.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
}