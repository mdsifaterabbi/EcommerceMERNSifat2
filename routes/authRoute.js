import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routiung
//REGISTER || METHOD POST
router.post('/register', registerController);

//login route
router.post('/login', loginController);



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