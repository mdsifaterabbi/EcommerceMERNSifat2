import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name: return res.send({ message: "name is required" });
            case !description: return res.send({ message: "description is required" });
            case !price: return res.send({ message: "price is required" });
            case !category: return res.send({ message: "category is required" });
            case !quantity: return res.send({ message: "quantity is required" });
            case photo && photo.size > 1000000:
                return res.send({ message: "Photo is required and size should be less than 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.send({
            success: true,
            message: "Product created successfully",
            products,
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'error occurred in createProductController',
            error
        });
    }
}

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(100).sort({ createdAt: -1 });

        res.send({
            totalProducts: products.length,
            message: "Product List: ",
            products
        });

    } catch (error) {
        console.log(error);
        res.send({
            message: "Error occurred in getProductController",
            error,
        });
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select("-photo");

        res.send({
            success: true,
            message: "Your searched product:",
            product
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error occurred in getSingleProductController",
            error
        });
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.send({
            message: 'Error occurred in productPhotoController',
            error
        });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: true,
            message: "Error occurred in deleteProductController",
            error,
        });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name: return res.send({ message: "name is required" });
            case !description: return res.send({ message: "description is required" });
            case !price: return res.send({ message: "price is required" });
            case !category: return res.send({ message: "category is required" });
            case !quantity: return res.send({ message: "quantity is required" });
            case photo && photo.size > 1000000:
                return res.send({ message: "Photo is required and size should be less than 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.send({
            success: true,
            message: "Product updated successfully",
            products,
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'error occurred in updateProductController',
            error
        });
    }
}

export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);


        res.send({
            success: true,
            message: 'Here is your filtered Products based on category and price',
            products,

        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Something went wrong in productFiltersController",
            error
        });
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");

        res.json(results);

    } catch (error) {
        res.send({
            success: false,
            message: "Error occurred in searchProductController",
            error
        });
    }
}

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(3).populate("category");

        res.send({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'Error occurred in relatedProductController',
            error
        });
    }
}

export const categoryWiseProducts = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.send({
            success: true,
            category,
            products
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error occurred in categoryWiseProducts controller",
            error
        });
    }
}