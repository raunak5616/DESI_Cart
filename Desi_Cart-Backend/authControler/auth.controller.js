import User from "../mongodb/models/userModel.js";
import bcryptjs from "bcryptjs";


{
  /** SIGN_UP */
}
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    console.log("Saved user id:", user._id);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

{
  /**LOGIN */
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }
    const user = await user.findOne({email}).select("+password");
    if(!user){
      return res.status(404).json({message:"user not found"});
    }

    const isPasswordValid = await bcryptjs.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(404).json({message:"Invalid Password"});
    }
    const token = jwt.sign({
      id:user._id,email:user.email
    },
  process.env.JWT_SECRET,
  {expiredIn:"1h"}
  )
  res.status(200).json({message:"Login Successfull",token});
  } catch (error) {
    console.log("Login Error",err);
    res.status(404).json({message:"Login Failed"});
  }
};
