import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {

        const { name, email, password, phone, address, answer } = req.body;

        //validation
        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!email) {
            return res.send({ error: 'email is required' });
        }
        if (!password) {
            return res.send({ error: 'password is required' });
        }
        if (!phone) {
            return res.send({ error: 'phone is required' });
        }
        if (!address) {
            return res.send({ error: 'address is required' });
        }
        if (!answer) {
            return res.send({ error: 'answer is required' });
        }

        //checking exixting user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send({ message: 'User already registered.PLease log in' });
        }

        //making the password hashedPassword
        const hashedPassword = await hashPassword(password);

        //save the user on database
        const user = await new userModel({ name, email, address, phone, password: hashedPassword, answer });
        user.save();

        res.send({
            message: "User saved successfully!",
            user
        });

        console.log('registerControler is working successfully!');

    } catch (error) {
        console.log(error);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.send({
                message: 'Please enter correct email or password'
            });
        }
        //check user 
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.send({
                message: 'User is not registered on this email'
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.send({
                message: "Password not matched!"
            });
        }
        //now creating json web token after successfull sign in
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d", });
        res.send({
            message: "Login succeed!",
            user: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            password: user.password, //new line added
            id: user._id, //new line added
            token
        });

    } catch (error) {
        console.log(error);
        res.send({
            message: "Error in login attempt",
            error
        });
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            return res.send({ message: 'email is required' });
        }
        if (!answer) {
            return res.send({ message: 'answer is required' });
        }
        if (!newPassword) {
            return res.send({ message: 'newPassword is required' });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.send({
                message: 'wrong email or answer',
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.send({
            message: 'password reset successfully',
            user
        });

    }
    catch (error) {
        res.send({
            message: 'Something went wrong!',
            error
        });
    }
}

export const testController = (req, res) => {
    res.send({
        message: "This is test route",
    });
}

export const findUserByEmailController = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        res.send({
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error occurred in findUserByEmailController",
            error
        });
    }
}

export const userUpdateController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, phone, address, answer } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, { name, email, phone, address, answer }, { new: true });

        //put query here
        res.send({
            success: true,
            message: "Data Updated Successfully",
            updatedUser
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'Error occurred in userUpdateController',
            error
        });
    }
}
