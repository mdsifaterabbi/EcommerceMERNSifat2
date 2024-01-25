import Layout from "../../layout/Layout"
import AdminMenu from "./AdminMenu"
import { useAuth } from "../../authContextAPI"
import UserCard from "../../components/UserCard";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard-Admin"}>

            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <AdminMenu />
                </div>
                <div className="basis-2/3 text-center">
                    {/* <pre>Name: {auth?.user}</pre>
                    <pre>Email: {auth?.email}</pre>
                    <pre>Role: {auth?.role}</pre> */}
                    <UserCard userData={auth} />
                </div>
            </div>


        </Layout>
    )
}

export default AdminDashboard