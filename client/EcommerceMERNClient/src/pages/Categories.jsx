import Layout from "../layout/Layout"
import useCategory from "../hooks/useCategory"
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title={"All Cetegories"}>
            <h1 className="text-center text-3xl font-bold tracking-widest py-[20px]">All Categories</h1>

            <div className="flex flex-col md:flex-row flex-wrap justify-center">
                <div className="basis-1/1 md:basis-1/1 border text-center">

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

            </div>

        </Layout>
    )
}

export default Categories