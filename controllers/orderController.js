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



