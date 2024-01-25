import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes based on token
export const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode; //Attaches user information: Adds the decoded user information from the token payload to the req.user object, making it accessible within subsequent routes or middleware.
        next();
    } catch (error) {
        console.log(error);
    }
}
//protected routes based on admin or not
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.send({
                message: "You are not an admin (isAdmin middleware)",
            });
        }
        else {
            next();
        }

    } catch (error) {
        res.send({
            message: "Error occurred in isAdmin middleware",
        });
    }
}