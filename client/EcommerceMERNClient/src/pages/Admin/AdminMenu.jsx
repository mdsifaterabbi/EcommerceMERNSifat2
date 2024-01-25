import { Link } from "react-router-dom"

const AdminMenu = () => {
    return (
        <>
            <div className="w-[300px] mx-auto">
                <h1 className="text-center">Admin Menu</h1>
                <ul className="menu rounded-box text-center min-w-max">
                    <li className="flex items-center justify-center text-red-600">
                        <Link to="/dashboard/admin/create-category" className="text-center border-[1px] border-purple-600 m-[2px]">Create Category</Link>
                    </li>
                    <li className="flex items-center justify-center text-red-600">
                        <Link to="/dashboard/admin/create-product" className="text-center border-[1px] border-purple-600 m-[2px]">Create product</Link>
                    </li>
                    <li className="flex items-center justify-center text-red-600">
                        <Link to="/dashboard/admin/products" className="text-center border-[1px] border-purple-600 m-[2px]">All products</Link>
                    </li>
                    <li className="flex items-center justify-center text-red-600">
                        <Link to="/dashboard/admin/users" className="text-center border-[1px] border-purple-600 m-[2px]">All Users</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminMenu