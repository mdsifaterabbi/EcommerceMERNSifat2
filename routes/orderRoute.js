import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createOrderController,
  findPaidProductsController,
  updatePaymentStatusController,
} from "../controllers/orderController.js";
import orderModel from "../models/orderModel.js";
//=============================
import SSLCommerzPayment from "sslcommerz-lts";

const app = express();

const router = express.Router();

router.post("/create-order", requireSignIn, createOrderController);

//paymentInitializeController with route together
router.post("/payment/success/:tranId", requireSignIn, async (req, res) => {
  try {
    const { tranId } = req.params;

    const store_id = process.env.SSL_STORE_ID;
    const store_passwd = process.env.SSL_STORE_PASSWORD;
    const is_live = false; //true for live, false for sandbox

    const orderResult = await orderModel.findOne({ transactionId: tranId });

    const data = {
      total_amount: orderResult?.totalPrice,
      currency: "BDT",
      tran_id: tranId, // use unique tran_id for each api call
      success_url: `http://localhost:8080/findPaidProducts/${tranId}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: orderResult?.customerName,
      cus_email: orderResult?.customerEmail,
      cus_add1: orderResult?.shippingAddress,
      cus_add2: orderResult?.shippingAddress,
      cus_city: orderResult?.shippingAddress,
      cus_state: orderResult?.shippingAddress,
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: orderResult?.customerPhone,
      cus_fax: "01711111111",
      ship_name: orderResult?.customerName,
      ship_add1: orderResult?.shippingAddress,
      ship_add2: orderResult?.shippingAddress,
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;

      fetch(`http://localhost:8080/payment/success/${tranId}`, {
        method: "POST",
      })
        .then((response) => {
          console.log("Success URL hit successfully:", response);
          res.send({
            url: GatewayPageURL,
            success: true,
            url2: `payment/success/${tranId}`,
          });
        })
        .catch((error) => {
          console.error("Error hitting success URL:", error);
          res.status(500).send({ message: "Internal server error" });
        });
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "paymentInitializeController problem occurred",
      error,
    });
  }
});

router.post(
  "/findPaidProducts/:tranId",
  requireSignIn,
  findPaidProductsController
);
router.put(
  "/update-payment-status/:tranId",
  requireSignIn,
  updatePaymentStatusController
);

export default router;
