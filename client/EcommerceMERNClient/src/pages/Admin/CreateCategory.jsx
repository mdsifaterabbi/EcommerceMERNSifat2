import { useEffect, useState } from "react"
import Layout from "../../layout/Layout"
import AdminMenu from "./AdminMenu"
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from 'antd';

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [buttonInfo, setButtonInfo] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/v1/category/create-category', { name });

            if (data?.success) {
                toast.success("Category created");
                getAllCategory();
                setName('');
            }
            else {
                toast.error("Couldn't add category");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in category input form");
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

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.put(`http://localhost:3000/api/v1/category/update-category/${selected._id}`, { name: updatedName });

            if (data?.success) {
                toast.success(data?.category?.name + " " + data?.message);
                setSelected(null);
                setUpdatedName("");
                setIsModalOpen(false);
                getAllCategory();

            }
            else {
                toast.error(data?.message);
            }
            console.log("handleUpdate function working");

        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in handleUpdate function");
        }

    }

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.delete(`http://localhost:3000/api/v1/category/delete-category/${selected._id}`);

            if (data?.success) {
                toast.success(data?.message);
                setSelected(null);
                setUpdatedName("");
                setIsModalOpen(false);
                getAllCategory();

            }
            else {
                toast.error(data?.message);
            }
            console.log("handleDelete function working");


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in handleDelete function");
        }

    }


    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <Layout title={"Admin-create-category"}>
            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <AdminMenu />
                </div>
                <div className="basis-2/3 text-center">
                    <h1>Manage Category</h1>
                    <div>
                        <CategoryForm handleSubmitFunction={handleSubmit} value={name} setValue={setName} />
                    </div>
                    <div className="overflow-x-auto md:w-[80%] md:mx-auto">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Iterate through categories and create a row for each */}
                                    {categories.map((category) => (
                                        <tr key={category._id}>
                                            <td>{category.name}</td>
                                            <td>
                                                <button className="btn btn-info" onClick={() => { setIsModalOpen(true); setUpdatedName(category.name), setSelected(category), setButtonInfo("edit") }}>Edit</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-error" onClick={() => { setIsModalOpen(true); setUpdatedName(category.name), setSelected(category), setButtonInfo("delete") }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}




                                </tbody>
                            </table>
                        </div>

                    </div>
                    <Modal title="Update Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <CategoryForm
                            handleSubmitFunction={(event) => {
                                switch (buttonInfo) {
                                    case "edit":
                                        handleUpdate(event);
                                        break;
                                    case "delete":
                                        handleDelete(event); // Assuming a handleDelete function exists
                                        break;
                                    default:
                                        handleDelete(event);
                                }
                            }}
                            value={updatedName}
                            setValue={setUpdatedName}
                            buttonInfo={buttonInfo}
                            setButtonInfo={setButtonInfo}
                        />
                    </Modal>

                </div>
            </div>
        </Layout >
    )
}

export default CreateCategory