import axios from "axios";
import Layout from "../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../CartContextAPI";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart([]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API}/api/v1/product/get-product/${
          params.slug
        }`
      );

      if (data?.success) {
        setProduct(data?.product);
        getSimilarProducts(data?.product._id, data?.product.category._id);
      } else {
        console.log(
          "Error occurred in getSingleProduct function of ProductDetails page"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`${product?.name}`}>
      <h1 className="text-center font-bold py-[20px] text-3xl">
        Product Details
      </h1>
      <div>
        <div className="card w-[70vw] bg-base-100 shadow-xl m-[5px] mx-auto">
          <figure>
            <img
              src={`${
                import.meta.env.VITE_REACT_API
              }/api/v1/product/product-photo/${product._id}`}
              alt="photo"
            />
          </figure>

          {
            //when all products will be shown
            product?.category?.name ? (
              <span className="badge badge-accent mx-auto">
                {product?.category?.name}
              </span>
            ) : (
              ""
            )
          }

          <div className="card-body">
            <h4 className="card-title text-[14px] font-bold md:text-xl">
              {product?.name}
            </h4>
            <h6 className="text-left">
              <span className="badge badge-sm badge-primary">
                {product?.price}
              </span>
            </h6>
            <p className="text-left text-sm">{product?.description}</p>
            <p className="text-left">
              Shipping:
              {product?.shipping ? (
                <span className="badge badge-success">Yes</span>
              ) : (
                <span className="badge badge-warning">No</span>
              )}
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-secondary">
                <button
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to Cart");
                  }}
                >
                  Cart +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[50px]">
          {relatedProducts.length < 1 ? (
            <h1 className="text-center text-3xl font-bold">
              No Similar Products
            </h1>
          ) : (
            <h1 className="text-center text-3xl font-bold">Similar Products</h1>
          )}
          <div className="flex flex-col sm:flex-row flex-wrap min-h-[70vh] justify-center">
            <div className="basis-1/1 sm:basis-3/4 text-center border border-black">
              <div className="flex flex-row flex-wrap justify-center">
                {relatedProducts.map((p) => (
                  <div className="basis-1/4 md:basis-1/3 card" key={p._id}>
                    <div
                      className="card bg-base-100 shadow-xl m-[5px]"
                      key={p._id}
                    >
                      <figure>
                        <img
                          src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                          alt="photo"
                        />
                      </figure>

                      {
                        //when all products will be shown
                        p?.category?.name ? (
                          <span className="badge badge-sm badge-accent ml-[5px]">
                            {p?.category?.name}
                          </span>
                        ) : (
                          ""
                        )
                      }

                      <div className="card-body">
                        <h4 className="card-title text-sm text-left ml-[-25px]">{p?.name}</h4>
                        <h6 className="text-left ml-[-25px]">
                          <span className="badge badge-sm badge-primary">
                            {p?.price}
                          </span>
                        </h6>
                        <p className="text-left text-sm md:text-xl ml-[-25px]">
                          {p?.description.substring(0, 30)}
                        </p>
                        <p className="text-left text-sm ml-[-25px]">
                          Shipping:
                          {p?.shipping ? (
                            <span className="badge badge-sm badge-success ml-[5px] inline">Yes</span>
                          ) : (
                            <span className="badge badge-sm badge-warning ml-[5px]">No</span>
                          )}
                        </p>
                        <div className="card-actions justify-start md:justify-end">
                          <div className="badge badge-sm badge-primary ml-[-25px]">
                            <button
                              onClick={() => navigate(`/product/${p?.slug}`)}
                            >
                              Details
                            </button>
                          </div>
                          <div className="badge badge-sm badge-secondary">
                            <button
                              onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, p])
                                );
                                toast.success("Item Added to Cart");
                              }}
                            >
                              Cart +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
