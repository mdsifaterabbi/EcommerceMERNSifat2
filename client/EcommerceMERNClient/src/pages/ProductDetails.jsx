import axios from "axios";
import Layout from "../layout/Layout"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    const getSingleProduct = async () => {

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_API}/api/v1/product/get-product/${params.slug}`);

            if (data?.success) {
                setProduct(data?.product);
                getSimilarProducts(data?.product._id, data?.product.category._id);
            }
            else {
                console.log("Error occurred in getSingleProduct function of ProductDetails page");
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getSingleProduct();
        }

    }, [params?.slug]);


    //get similar products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_API}/api/v1/product/related-product/${pid}/${cid}`);

            setRelatedProducts(data?.products);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Layout title={`${product?.name}`}>
            <h1 className="text-center font-bold py-[20px] text-3xl">Product Details</h1>
            <div>


                <div className="card w-[70vw] bg-base-100 shadow-xl m-[5px] mx-auto">
                    <figure><img src={`${import.meta.env.VITE_REACT_API}/api/v1/product/product-photo/${product._id}`} alt="photo" /></figure>

                    { //when all products will be shown
                        product?.category?.name ? <span className="badge badge-accent mx-auto">{product?.category?.name}</span> : ''
                    }

                    <div className="card-body">
                        <h4 className="card-title">
                            {product?.name}
                        </h4>
                        <h6 className="text-left"><span>$ <span className="badge badge-primary">{product?.price}</span></span></h6>
                        <p className="text-left">{product?.description}</p>
                        <p className="text-left">Shipping Status: {product?.shipping ? <span className='badge badge-success'>Yes</span> : <span className='badge badge-warning'>No</span>}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-secondary">
                                <button>Add To Cart</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="py-[50px]">

                    {
                        relatedProducts.length < 1 ? <h1 className="text-center text-3xl font-bold">No Similar Products</h1> : <h1 className="text-center text-3xl font-bold">Similar Products</h1>
                    }
                    <div className="flex flex-col sm:flex-row flex-wrap min-h-[70vh] justify-center">
                        <div className="basis-1/1 sm:basis-3/4 text-center border border-black">
                            <div className="flex flex-wrap justify-center">
                                {
                                    relatedProducts.map((p) =>
                                        <div className="card w-[20vw] bg-base-100 shadow-xl m-[5px]">
                                            <figure><img src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`} alt="photo" /></figure>

                                            { //when all products will be shown
                                                p?.category?.name ? <span className="badge badge-accent mx-auto">{p?.category?.name}</span> : ''
                                            }

                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    {p?.name}
                                                </h4>
                                                <h6 className="text-left"><span>$ <span className="badge badge-primary">{p?.price}</span></span></h6>
                                                <p className="text-left">{p?.description.substring(0, 30)}</p>
                                                <p className="text-left">Shipping Status: {p?.shipping ? <span className='badge badge-success'>Yes</span> : <span className='badge badge-warning'>No</span>}</p>
                                                <div className="card-actions justify-end">
                                                    <div className="badge badge-primary">
                                                        <button onClick={() => navigate(`/product/${p?.slug}`)}>See Details</button>
                                                    </div>
                                                    <div className="badge badge-secondary">
                                                        <button>Add To Cart</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </Layout>
    )
}

export default ProductDetails