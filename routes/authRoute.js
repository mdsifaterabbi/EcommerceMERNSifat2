import express from "express";
import { findUserByEmailController, forgotPasswordController, loginController, registerController, testController, userUpdateController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routiung
//REGISTER || METHOD POST
router.post('/register', registerController);

//login route
router.post('/login', loginController);

//find user by email
router.post('/user', findUserByEmailController);

//update user information
router.put('/user/update/:id', userUpdateController);

//protected Route for user
router.get('/user-auth', requireSignIn, (req, res) => {
    res.send({ ok: true });
});

//protected Route for admin
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.send({
        message: "This is ok till now"
    });
});

router.post('/forgot-password', forgotPasswordController);

//test route
router.get('/test', requireSignIn, isAdmin, testController);

export default router;