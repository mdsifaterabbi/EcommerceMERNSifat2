import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';
import { createOrderController } from "../controllers/orderController.js";
import orderModel from "../models/orderModel.js";
//=============================
import SSLCommerzPayment from 'sslcommerz-lts';

const app = express();

const router = express.Router();

router.post('/create-order', requireSignIn, createOrderController);

router.post('/payment/:orderId', requireSignIn, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const orderData = await orderModel.findById({ _id: orderId });

        function generateTransactionId() {
            const timestamp = Date.now();
            const randomSuffix = Math.random().toString(36).substring(2, 7); // 5 random characters
            return `TR${timestamp}-${randomSuffix}`; // Example: "TR1667704546954-5e5z2f"
        }

        const store_id = process.env.SSL_STORE_ID;
        const store_passwd = process.env.SSL_STORE_PASSWORD;
        const is_live = false; //true for live, false for sandbox


        const data = {
            total_amount: orderData.totalPrice,
            currency: 'BDT',
            tran_id: generateTransactionId(), // use unique tran_id for each api call
            success_url: `http://localhost:8080/payment/success/${generateTransactionId()}/${orderId}`,
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: orderData.customerName,
            cus_email: orderData.customerEmail,
            cus_add1: orderData.shippingAddress,
            cus_add2: orderData.shippingAddress,
            cus_city: orderData.shippingAddress,
            cus_state: orderData.shippingAddress,
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: orderData.customerPhone,
            cus_fax: '01711111111',
            ship_name: orderData.customerName,
            ship_add1: orderData.shippingAddress,
            ship_add2: orderData.shippingAddress,
            ship_city: orderData.shippingAddress,
            ship_state: orderData.shippingAddress,
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            //res.redirect(GatewayPageURL)
            res.send({ url: GatewayPageURL })
            console.log('Redirecting to: ', GatewayPageURL)
        });


        // res.send({
        //     success: true,
        //     message: "Till now payment is good",
        //     orderId,
        //     orderData,
        //     data
        // });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'Error occurred in /payment post route',
            error
        });
    }
});

router.put('/payment/success/:tranId/:orderId', async (req, res) => {
    try {
        const tranId = req.params.tranId;
        const orderId = req.params.orderId;

        //my order status update process starts form here
        const updatedPaymentData = await orderModel.findByIdAndUpdate(
            { _id: orderId },
            {
                $set: {
                    paymentStatus: 1,
                    transactionId: tranId
                }
            },
            { new: true });

        res.send({
            success: true,
            tranId: tranId,
            orderId: orderId,
            updatedPaymentData
        });

        // 1. Verify Transaction Details:
        // - Retrieve the original order and transaction data based on the tranId.
        // - Match the transaction details received from SSLCommerz with your records.
        // - Ensure the transaction status is indeed successful.

        // 2. Update Order Status:
        // - If verification is successful, update the order status in your database to reflect payment completion.

        // 3. Send Response to Client:
        // - Redirect the user to an appropriate success page or display a success message.
        // - Optionally, include order details or a payment confirmation receipt.

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error processing payment success',
            error: error.message, // Send a user-friendly error message
        });
    }
});


export default router;