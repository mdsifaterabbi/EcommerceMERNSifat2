import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import orderModel from "../models/orderModel.js";
import crypto from "crypto";

import express from "express";
import SSLCommerzPayment from "sslcommerz-lts";

export const createOrderController = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      shippingAddress,
      customerPhone,
      totalProducts,
      totalPrice,
      paymentStatus,
      transactionId,
      productsList,
    } = req.body;

    //validation
    switch (true) {
      case !customerName:
        return res.send({ message: "customerName is required" });
      case !customerEmail:
        return res.send({ message: "customerEmail is required" });
      case !shippingAddress:
        return res.send({ message: "shippingAddress is required" });
      case !customerPhone:
        return res.send({ message: "customerPhone is required" });
      case !totalProducts:
        return res.send({ message: "totalProducts is required" });
      case !totalPrice:
        return res.send({ message: "totalPrice is required" });
      case !productsList:
        return res.send({ message: "productsList is required" });
    }

    const orderResult = new orderModel({
      customerName,
      customerEmail,
      shippingAddress,
      customerPhone,
      totalProducts,
      totalPrice,
      paymentStatus,
      transactionId,
      productsList,
    });

    await orderResult.save();

    res.send({
      success: true,
      orderId: orderResult._id,
      message: "createOrderController working properly",
      customerName,
      customerEmail,
      shippingAddress,
      customerPhone,
      totalProducts,
      totalPrice,
      paymentStatus,
      transactionId,
      productsList,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error occurred in createOrderController",
      error,
    });
  }
};

export const findPaidProductsController = async (req, res) => {
  try {
    const { tranId } = req.params;
    const orderResult = await orderModel.findOne({ transactionId: tranId });
    res.send({
      tranId: tranId,
      orderId: orderResult._id,
      productsList: orderResult.productsList,
      customerName: orderResult.customerName,
      customerEmail: orderResult.customerEmail,
      customerPhone: orderResult.customerPhone,
      shippingAddress: orderResult.shippingAddress,
      totalProducts: orderResult.totalProducts,
      totalPrice: orderResult.totalPrice,
      paymentStatus: orderResult.paymentStatus,
      createdAt: orderResult.createdAt.toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      }),
      updatedAt: orderResult.updatedAt.toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      }),
    });
  } catch (error) {}
};

export const updatePaymentStatusController = async (req, res) => {
  try {
    const { tranId } = req.params;
    const orderData = await orderModel.findOne({ transactionId: tranId });
    const orderId = orderData?._id;
    const paymentStatus = orderData?.paymentStatus;

    if (orderId && paymentStatus === 0) {
      const updatedOrderStatus = await orderModel.findByIdAndUpdate(
        { _id: orderId },
        {
          $set: {
            paymentStatus: 1,
          },
        },
        { new: true }
      );
        res.send({
        success: true,
        message: "updatePaymentStatusController updated payment status",
        tranId: tranId,
        orderId: orderId,
        paymentStatus: updatedOrderStatus?.paymentStatus,
      });
    } else {
        res.send({
        success: false,
        message: "updatePaymentStatusController not working properly",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "updatePaymentStatusController not working properly",
    });
  }
};
