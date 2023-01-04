import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


// Register a new User
export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const newUser = new userModel(req.body);

    try {

        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        const user = await newUser.save()
        const token = jwt.sign(
            {
                username: user.username,
                email: user.email,
                userId: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ user, token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email: email })

        if (user) {

            const validity = await bcrypt.compare(password, user.password)
            if (!validity) {
                res.status(400).json("Wrong Password")
            }
            else {
                const token = jwt.sign(
                    {
                        username: user.username,
                        email: user.email,
                        userId: user._id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.status(200).json({user, token})
            }


        }
        else {
            res.status(404).json("User does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};