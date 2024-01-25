import { useEffect, useState } from "react"
import Layout from "../../layout/Layout"
import AdminMenu from "./AdminMenu"
import toast from "react-hot-toast";
import axios from "axios";
import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]); //for all drop-down categories
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(null);
    const [category, setCategory] = useState(""); //for selected product category
    const [categoryName, setCategoryName] = useState("");
    const [id, setId] = useState(""); // id of seleted product


    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/v1/product/get-product/${params.slug}`);
            setName(data?.product?.name);
            setDescription(data?.product?.description);
            setPrice(data?.product?.price);
            setQuantity(data?.product?.quantity);
            setShipping(data?.product?.shipping);
            //setCategory(data?.product?.category);
            setCategory(data?.product?.category?._id);
            setCategoryName(data?.product?.category);
            setPhoto(data?.product?.photo);


            setId(data?.product?._id); // new added at 18 minutes


        } catch (error) {
            console.log(error, " occurred in UpdateProduct.jsx page");
        }
    }

    const getAllCategory = async (req, res) => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);

            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong on getting category");
        }
    }

    useEffect(() => {
        getAllCategory();
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    console.log(category, " Current Category");

    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            photo && productData.append("photo", photo);

            const { data } = await axios.put(`http://localhost:3000/api/v1/product/product-update/${id}`, productData);

            if (data?.success) {
                toast.success("Product updated successfully!");

                // Delay navigation using setTimeout:
                setTimeout(() => {
                    navigate('/dashboard/admin/products');
                }, 3000); // Delay for 3 seconds (3000 milliseconds)

            }
            else {
                toast.error(data?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in handleCreateProduct function");
        }
    }

    const handleDeleteProduct = async (event) => {
        event.preventDefault();
        try {
            let checkDelete = window.prompt("Are you sure you want to delete?Type: yes to delete");

            if (checkDelete != 'yes') {
                toast.success("Be sure before deleting next time");
                setTimeout(() => {
                    navigate('/dashboard/admin/products');
                }, 3000); // Delay for 3 seconds (3000 milliseconds)
                return;
            }

            const { data } = await axios.delete(`http://localhost:3000/api/v1/product/product-delete/${id}`);

            if (data?.success) {
                toast.success("Product deleted successfully!");
                // Delay navigation using setTimeout:
                setTimeout(() => {
                    navigate('/dashboard/admin/products');
                }, 3000); // Delay for 3 seconds (3000 milliseconds)

            }
            else {
                toast.error(data?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while deleting product in handleDeleteProduct function in UpdateProduct.jsx page");
        }
    }

    console.log(shipping);

    return (
        <Layout title={"Update Product"}>
            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <AdminMenu />
                </div>
                <div className="basis-2/3 text-center pt-[20px]">
                    <h1 className="py-[30px]">Update Product Page</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center w-[100%] text-slate-500">
                        <div className="basis-3/4 my-[5px]">

                            <span>Choose product category<br /></span>
                            <select onChange={(e) => setCategory(e.target.value)} >
                                <option selected className="font-bold text-green-700">{categoryName?.name}</option>
                                {
                                    categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <label className="btn btn-info">
                                {photo ? photo.name : "Upload photo"}
                                <input type="file" name="photo" accept="image/*" onChange={(e) => { setPhoto(e.target.files[0]) }} hidden />
                            </label>
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            {
                                photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className="max-w-[250px] h-auto mx-auto" />
                                    </div>
                                ) : (<div className="text-center">
                                    <img src={`http://localhost:3000/api/v1/product/product-photo/${id}`} alt="product-photo" height={"200px"} className="max-w-[250px] h-auto mx-auto" />
                                </div>)
                            }
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <input type="text" value={name} placeholder="name of product" onChange={(e) => setName(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%]" />
                        </div>
                        <div className="basis-3/4 my-[5px]">

                            <textarea placeholder="add product description" value={description} onChange={(e) => setDescription(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%] max-h-[300px]" />

                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <input type="number" value={quantity} placeholder="add product quantity" onChange={(e) => setQuantity(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%]" />
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <input type="number" value={price} placeholder="add product price" onChange={(e) => setPrice(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%]" />
                        </div>

                        <div className="basis-3/4 my-[5px]">
                            <select onChange={(e) => {
                                setShipping(e.target.value);
                            }} className="w-[100%]" >
                                <option selected className="font-bold text-green-700 m-auto">{shipping === true ? 'Yes' : 'No'}</option>

                                <option value="false">Shipping-No</option>
                                <option value="true">Shipping-Yes</option>

                            </select>
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <button className="btn btn-primary mx-[5px]" onClick={handleUpdateProduct}>Update Product</button>
                            <button className="btn btn-warning mx-[5px]" onClick={handleDeleteProduct}>Delete Product</button>
                        </div>

                    </div>

                </div>
            </div>
        </Layout >
    )
}

export default UpdateProduct