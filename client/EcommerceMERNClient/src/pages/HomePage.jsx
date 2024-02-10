import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//import { json } from "react-router-dom";
import { Prices } from "../components/Prices";
import ReactPaginate from "react-paginate";
import styles from "../CustomCSS/Pagination.module.css";
import { useCart } from "../CartContextAPI";

const HomePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart([]);

  const [filterKey, setFilterKey] = useState(0);

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/get-product"
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error(
        "Error occurred in getAllProducts function in HomePage.jsx page"
      );
    }
  };

  //handle category filter
  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  //function for filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/product-filters",
        { checked, radio }
      );

      //setProducts(data?.products);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilter = () => {
    console.log("Reset Called");
    setChecked([]);
    setRadio([]);
    setFilterKey(filterKey + 1); //re-renders the radio buttons and checkboxes
  };

  /*============react-paginate code starts from here===================*/
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handlePageChange = (data) => {
    const { selected } = data;
    setCurrentPage(selected + 1); // Since the `selected` index starts at 0
  };

  const paginatedItems = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /*==============react-paginate code ended here=================*/

  return (
    <Layout title={"All Products"}>
      <div className="flex flex-col sm:flex-row flex-wrap min-h-[70vh]">
        <div className="basis-1/1 sm:basis-1/4 text-center border border-black">
          <h6>Filter By Category</h6>
          <div className="flex flex-row flex-wrap px-[20px] pt-[20px]">
            {categories?.map((c) => (
              <div key={c._id}>
                <Checkbox
                  key={filterKey}
                  onChange={(e) =>
                    handleCategoryFilter(e.target.checked, c._id)
                  }
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <h6 className="pt-[20px]">Filter By Price</h6>
          <div className="flex flex-row flex-wrap px-[20px] pt-[20px]">
            <Radio.Group
              key={filterKey}
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((p) => (
                <div key={p._id} className="flex flex-wrap flex-col">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-row flex-wrap px-[20px] pt-[20px]">
            <button className="btn btn-outline" onClick={() => resetFilter()}>
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="basis-1/1 sm:basis-3/4 text-center border border-black">
          {JSON.stringify(checked, null, 4)}

          <h1 className="py-[50px]">All products</h1>
          <div className="flex flex-row flex-wrap justify-center">
            {paginatedItems?.map((p) => (
              <div
                className="basis-1/4 md:basis-1/3 card border-[2px] shadow-xl m-[5px]"
                key={p._id}
              >
                <figure className="">
                  <img
                    src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                    alt="photo"
                  />
                </figure>

                {
                  //when all products will be shown
                  p?.category?.name ? (
                    <span className="badge badge-sm badge-accent ml-[2px] md:mx-auto mt-[10px]">
                      {p?.category?.name}
                    </span>
                  ) : (
                    ""
                  )
                }

                <div className="card-body">
                  <h4 className="bg-green-400 text-[12px] md:text-xl mt-[-20px] mx-[-30px]">
                    {p?.name}
                  </h4>
                  <h6 className="text-left text-[12px] md:text-xl mx-[-30px]">
                    <span className="badge badge-sm badge-primary">
                      ${p?.price}
                    </span>
                  </h6>
                  <p className="text-left text-[12px] md:text-lg hidden md:block mx-[-30px]">
                    {p?.description.substring(0, 30)}...
                  </p>
                  <div className="card-actions justify-start md:justify-end mx-[-30px]">
                    <div className="badge badge-sm badge-primary inline-block md:block">
                      <button onClick={() => navigate(`/product/${p?.slug}`)}>
                        Details
                      </button>
                    </div>
                    <div className="badge badge-sm badge-success rounded-sm inline-block md:block">
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
            ))}

            {/* {
                            paginatedItems?.map((p) =>
                                <div className="card w-[150px] md:w-[300px] border-[2px] bg-[#b9b9b9] shadow-xl m-[5px]" key={p._id}>
                                    <figure className="bg-[#e3bd9b]"><img src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`} alt="photo" /></figure>

                                    { //when all products will be shown
                                        p?.category?.name ? <span className="badge badge-accent mx-auto mt-[10px]">{p?.category?.name}</span> : ''
                                    }

                                    <div className="card-body">
                                        <h4 className="card-title text-[12px] md:text-xl mt-[-20px]">
                                            {p?.name}
                                        </h4>
                                        <h6 className="text-left text-[12px] md:text-xl"><span>$ <span className="badge badge-primary">{p?.price}</span></span></h6>
                                        <p className="text-left text-[12px] md:text-lg">{p?.description.substring(0, 30)}...</p>
                                        <div className="card-actions justify-start md:justify-end">
                                            <div className="badge badge-primary">
                                                <button onClick={() => navigate(`/product/${p?.slug}`)}>See Details</button>
                                            </div>
                                            <div className="bg-orange-500 rounded-sm">
                                                <button
                                                    onClick={() => {
                                                        setCart([...cart, p])
                                                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                                        toast.success("Item Added to Cart")
                                                    }}
                                                >
                                                    Cart + </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        } */}
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            // pageCount={Math.ceil(paginatedItems.length / pageSize)}
            pageCount={Math.ceil(products.length / pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={currentPage - 1}
            onPageChange={handlePageChange}
            //containerClassName={"pagination justify-center"}
            //activeClassName={"bg-blue-500"}
            //activeLinkClassName={"text-red"}

            containerClassName={styles.pagination} // Apply the module class
            activeClassName={styles.active} // Apply the module class
            activeLinkClassName={styles.activeLink} // Apply the module class
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
