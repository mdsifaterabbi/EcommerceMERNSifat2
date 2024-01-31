import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import fs from 'fs';
import orderModel from "../models/orderModel.js";
import crypto from 'crypto';
import SSLCommerzPayment from "sslcommerz-lts"
import express from "express"; //alpha testing


export const createOrderController = async (req, res) => {
    try {

        const { customerName, customerEmail, shippingAddress, customerPhone, totalProducts, totalPrice, paymentStatus, transactionId, productsList } = req.body;

        //validation
        switch (true) {
            case !customerName: return res.send({ message: "customerName is required" });
            case !customerEmail: return res.send({ message: "customerEmail is required" });
            case !shippingAddress: return res.send({ message: "shippingAddress is required" });
            case !customerPhone: return res.send({ message: "customerPhone is required" });
            case !totalProducts: return res.send({ message: "totalProducts is required" });
            case !totalPrice: return res.send({ message: "totalPrice is required" });
            case !productsList: return res.send({ message: "productsList is required" });

        }

        const orderResult = new orderModel({ customerName, customerEmail, shippingAddress, customerPhone, totalProducts, totalPrice, paymentStatus, transactionId, productsList });

        await orderResult.save();

        res.send({
            success: true,
            orderId: orderResult._id, //new line added
            message: "createOrderController working properly",
            customerName, customerEmail, shippingAddress, customerPhone, totalProducts, totalPrice, paymentStatus, transactionId, productsList
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error occurred in createOrderController",
            error
        });
    }
}

export const paymentController = async (req, res) => {

    try {

        const id = req.params.id;

        const orderDetails = await orderModel.findOne({ _id: id });

        const tran_id = crypto.randomBytes(16).toString('hex');

        const store_id = process.env.SSL_STORE_ID;
        const store_passwd = process.env.SSL_STORE_PASSWORD;
        const is_live = false //true for live, false for sandbox

        const data = {
            total_amount: orderDetails?.totalPrice,
            currency: 'BDT',
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `http://localhost:8080/payment/success/${tran_id}`,
            fail_url: 'http://localhost:8080/fail',
            cancel_url: 'http://localhost:8080/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: orderDetails?.customerName,
            cus_email: orderDetails?.customerEmail,
            cus_add1: orderDetails?.shippingAddress,
            cus_add2: orderDetails?.shippingAddress,
            cus_city: orderDetails?.shippingAddress,
            cus_state: orderDetails?.shippingAddress,
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: orderDetails?.customerPhone,
            cus_fax: '01711111111',
            ship_name: orderDetails?.customerName,
            ship_add1: orderDetails?.shippingAddress,
            ship_add2: orderDetails?.shippingAddress,
            ship_city: orderDetails?.shippingAddress,
            ship_state: orderDetails?.shippingAddress,
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            //res.redirect(GatewayPageURL)

            res.send({
                url: GatewayPageURL,
                success: true,
                data: data,
                tran_id: tran_id,
                orderId: id,
            }
            );
            console.log('Redirecting to: ', GatewayPageURL)
        });



    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error occurred in paymentController",
            error
        });
    }
}

export const finalOrderController = async (req, res) => {
    try {

        const orderInfo = await orderModel.findById({ _id: req.params.orderId });

        const customerName = orderInfo?.customerName;
        const customerEmail = orderInfo?.customerEmail;
        const shippingAddress = orderInfo?.shippingAddress;
        const customerPhone = orderInfo?.customerPhone;
        const totalProducts = orderInfo?.totalProducts;
        const totalPrice = orderInfo?.totalPrice;
        const paymentStatus = 1; //1 for paid
        const transactionId = req.params.tran_id;
        const productsList = orderInfo?.productsList;

        const orderUpdate = await orderModel.findByIdAndUpdate({ _id: req.params.orderId }, { customerName, customerEmail, shippingAddress, customerPhone, totalProducts, totalPrice, paymentStatus, transactionId, productsList }, { new: true });

        res.send({
            success: true,
            tran_id: req.params.tran_id,
            orderId: req.params.orderId,
            customerName: orderInfo.customerName,
            orderUpdate
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'Error occurred in finalOrderController'
        });
    }


}


