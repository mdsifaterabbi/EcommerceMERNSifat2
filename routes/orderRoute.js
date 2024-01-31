import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';
import { createOrderController, finalOrderController, paymentController } from "../controllers/orderController.js";

const router = express.Router();

router.post('/create-order', requireSignIn, createOrderController);
router.post('/payment/:id', requireSignIn, paymentController);
router.post('/payment/success/:tran_id/:orderId', requireSignIn, async (req, res) => {
    try {
        res.send({
            message: "Alpha testing",
            tran_id: req.params.tran_id,
            orderId: req.params.orderId
        });
    } catch (error) {
        console.log("Error occurred in orderRoute.js");
    }
});

router.put('/payment/success/:tran_id/:orderId', requireSignIn, finalOrderController);

export default router;