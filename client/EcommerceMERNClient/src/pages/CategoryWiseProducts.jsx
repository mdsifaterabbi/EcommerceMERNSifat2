import Layout from "../layout/Layout"
import useCategory from "../hooks/useCategory"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const CategoryWiseProducts = () => {
    const categories = useCategory();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_API}/api/v1/product/category-wise-products/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug)
            getProductsByCat();
    }, [params?.slug]);


    return (
        <Layout title={"Cat wise products"}>
            {/* <h1>CategoryWiseProducts ===</h1>
            <span>{category?.name}</span>
            <ul>
                {
                    products?.map((p) => <li key={p._id}>{p?.name}</li>)

                }
            </ul> */}
            <div className="flex flex-col md:flex-row flex-wrap">
                <div className="basis-1/1 md:basis-1/4 border text-center">

                    <div className="flex flex-col items-center justify-center min-h-[70vh]">
                        <ul>
                            {categories?.map((c) => (
                                <li key={c?._id} className="m-4 flex flex-col items-center h-full">
                                    <Link to={`/category/${c.slug}`} className="btn btn-sm btn-info">{c?.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="basis-1/1 md:basis-3/4 border text-center">
                    <h1>Category Wise Products</h1>
                    <h5>Category -{category?.name} </h5>
                    <h6>Products Found: {products?.length}</h6>
                    {/* <p>
                        <ul>
                            {
                                products?.map((p) => <li key={p._id}>{p?.name}</li>)

                            }
                        </ul>
                    </p> */}
                    <div className="flex flex-wrap justify-center">
                        {
                            products?.map((p) =>
                                <div className="card w-[300px] bg-base-100 shadow-xl m-[5px]" key={p._id}>
                                    <figure><img src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`} alt="photo" /></figure>

                                    { //when all products will be shown
                                        p?.category?.name ? <span className="badge badge-accent mx-auto">{p?.category?.name}</span> : ''
                                    }

                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {p?.name}
                                        </h4>
                                        <h6 className="text-left"><span>$ <span className="badge badge-primary">{p?.price}</span></span></h6>
                                        <p className="text-left">{p?.description.substring(0, 30)}...</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-primary">
                                                <button onClick={() => navigate(`/product/${p?.slug}`)}>See Details</button>
                                            </div>
                                            <div className="badge badge-secondary">
                                                <button>Add To Cart</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryWiseProducts