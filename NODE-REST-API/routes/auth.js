import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
const router = Router();

// Register
router.post("/register", async (req, res) => {
    try {
        //create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

// login
router.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("your password is not valid");
        if (validPassword && user) {
            res.status(200).json(user)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

export default router