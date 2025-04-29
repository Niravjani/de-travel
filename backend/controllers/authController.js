import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
 export const register = async (req, res) => {  
    try {
        // Validate password
        if (!req.body.password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        // Hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

// Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
          });

        await newUser.save();
        res.status(200).json({ success: true, message: "Successfully created" });
    } catch (err) {
console.error(err); // Log the error for debugging
            res.status(500).json({ success: false, message: "Failed to create user. Try again." });
        }
};

// Login a user
export const login  = async (req, res) => {  
   //cons { username, email, password } = req.body;
   const email = req.body.email;
   //const password = req.body.password;

    try {
        const user = await User.findOne({ email });
        //if user does not exist 
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
        // if user exist then check password  or compare  password
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        //check if password is incorrect 
        if (!checkPassword) {
            return res.status(400).json({ success: false, message: "Invalid password" });
          }

        const {password,role, ...rest } = user._doc; // Exclude password from the response
        // Create a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15d" }); 

        //set cookie with token
        res.cookie("access_token", token, {
            httpOnly: true,
            expires:token.expiresIn, 
        }).status(200).json({ success: true, message: "Login successful",token, data:{...rest},role });}
        catch (err) {
            res.status(500).json({ success: false, message: "failed to login  " });
        }
}    