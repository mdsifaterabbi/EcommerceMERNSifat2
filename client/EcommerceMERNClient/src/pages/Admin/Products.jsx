import { useEffect, useState } from "react"
import Layout from "../../layout/Layout"
import AdminMenu from "./AdminMenu"
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import styles from '../../CustomCSS/Pagination.module.css';

const Products = () => {

    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/v1/product/get-product');
            setProducts(data.products);

        } catch (error) {
            console.log(error);
            toast.error("Error occurred in getAllProducts function in Products.jsx page");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    /*============react-paginate code starts from here===================*/
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    const handlePageChange = (data) => {
        const { selected } = data;
        setCurrentPage(selected + 1); // Since the `selected` index starts at 0
    };

    const paginatedItems = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    /*==============react-paginate code ended here=================*/




    return (
        <Layout title={"All Products"}>

            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/1 text-center pt-[20px]">
                    <div className="flex flex-col flex-wrap justify-center">
                        <div className="basis-1/1 text-center mt-[50px] mb-[50px]">
                            <div className="bg-blue-800 text-white rounded-lg py-[10px]">Customize your products</div>
                        </div>
                        <div className="basis-1/1 text-center mt-[50px] mb-[50px]">
                            <AdminMenu />
                        </div>
                    </div>
                    {/* <AdminMenu /> */}
                </div>
                <div className="basis-1/1 text-center pt-[20px]">
                    <h1 className="py-[30px]">All Products List</h1>
                    <div className="flex flex-wrap justify-center"> {/* Add flex container for cards */}

                        {
                            paginatedItems.map((p) =>

                                <div className="card w-96 bg-base-100 shadow-xl m-[5px]" key={p._id}>
                                    <figure><img src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`} alt="photo" /></figure>
                                    <span className="badge badge-accent mx-auto">{p?.category?.name}</span>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {p?.name}
                                        </h2>
                                        <p className="badge badge-neutral">{p?.price} BDT</p>
                                        <div className="card-actions justify-end">
                                            <Link to={`/dashboard/admin/update-product/${p.slug}`}>
                                                <div className="badge badge-outline">Update</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
    )
}

export default Products