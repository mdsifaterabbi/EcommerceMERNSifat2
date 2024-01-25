import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.send({
                message: "name is required",
            });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.send({
                message: "this category already exists."
            });
        }
        const category = await new categoryModel({ name, slug: slugify(name) });
        category.save();

        res.send({
            success: true,
            message: 'category created successfully',
            category
        });


    } catch (error) {
        console.log(error);
        res.send({
            message: 'Error occurred in createCategoryController',
            error
        });
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        res.send({
            success: true,
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "error occurred in updateCategoryController"
        });
    }
}

export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.send({
            success: true,
            message: "All Category list",
            category,
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error occurred in getCategoryController",
            error,
        });
    }
}

export const getSingleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params.slug;
        const category = await categoryModel.findOne();
        res.send({
            success: true,
            message: 'Get Single Category',
            category,
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "error occurred in getSingleCategoryController"
        });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "category deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "error occurred in deleteCategoryController",
        });
    }
}