import { useEffect, useState } from "react"
import Layout from "../../layout/Layout"
import AdminMenu from "./AdminMenu"
import toast from "react-hot-toast";
import axios from "axios";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(false);
    const [category, setCategory] = useState("");

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
    }, []);


    const handleCreateProduct = async (event) => {
        event.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            productData.append("photo", photo);

            const { data } = await axios.post('http://localhost:3000/api/v1/product/create-product', productData);

            if (data?.success) {
                toast.success("Product created successfully!");
                setPhoto("");
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setShipping(false);
                setQuantity("");
                setCategory("");

                // Delay navigation using setTimeout:
                setTimeout(() => {
                    navigate('/dashboard/admin/products');
                }, 3000); // Delay for 3 seconds (3000 milliseconds)


                //navigate('/dashboard/admin/products');
            }
            else {
                toast.error(data?.message);

            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in handleCreateProduct function");
        }
    }

    return (
        <Layout title={"Admin-create-product"}>
            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <AdminMenu />
                </div>
                <div className="basis-2/3 text-center pt-[20px]">
                    <h1 className="py-[30px]">Create Product Page</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center w-[100%] text-slate-500">
                        <div className="basis-3/4 my-[5px]">

                            <span>Choose product category<br /></span>
                            <select onChange={(e) => setCategory(e.target.value)}>
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
                                photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className="max-w-[250px] h-auto mx-auto" />
                                    </div>
                                )
                            }
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <input type="text" value={name} placeholder="name of product" onChange={(e) => setName(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%]" />
                        </div>
                        <div className="basis-3/4 my-[5px]">

                            <textarea placeholder="add product description" onChange={(e) => setDescription(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%] max-h-[300px]" />

                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <input type="number" value={quantity} placeholder="add product quantity" onChange={(e) => setQuantity(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%]" />
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <input type="number" value={price} placeholder="add product price" onChange={(e) => setPrice(e.target.value)} className="border-[2px] px-[5px] text-slate-500 w-[100%]" />
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <span>Add Shipping Info: </span>
                            <select onChange={(e) => {
                                setShipping(e.target.value);
                            }} className="border-[2px] px-[5px] text-slate-500 w-[100%]">
                                <option defaultValue="0" disabled>Choose Shipping</option>

                                <option value="0">Shipping-No</option>
                                <option value="1">Shipping-Yes</option>

                            </select>
                        </div>
                        <div className="basis-3/4 my-[5px]">
                            <button className="btn btn-primary" onClick={handleCreateProduct}>Create Product</button>
                        </div>
                    </div>

                </div>
            </div>
        </Layout >
    )
}

export default CreateProduct