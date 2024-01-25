import Layout from "../layout/Layout"
import React from 'react'
import { useSearch } from "../searchContextAPI"

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout title={'Search Results'}>
            <div>
                {/* <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6> */}
                <div className="flex flex-col sm:flex-row flex-wrap min-h-[70vh] justify-center">
                    <div className="basis-1/1 sm:basis-3/4 text-center border border-black">
                        Your searched Products {values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}
                    </div>
                    <div className="basis-1/1 sm:basis-3/4 text-center border border-black">
                        <div className="flex flex-wrap justify-center">
                            {
                                values?.results.map((p) =>
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
                                                    <button>See Details</button>
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
                {/* {
                    values?.results.map((p) =>
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
                                        <button>See Details</button>
                                    </div>
                                    <div className="badge badge-secondary">
                                        <button>Add To Cart</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                } */}
            </div>
        </Layout>
    )
}

export default Search