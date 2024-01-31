import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true
    },
    totalProducts: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Number,
        default: 0
    },
    transactionId: {
        type: String,
        default: null
    },
    productsList: {
        type: Array,
        required: true
    }

}, { timestamps: true });

export default mongoose.model('orders', orderSchema);