import Layout from "../../layout/Layout"
import AdminMenu from "./AdminMenu"

const Users = () => {
    return (
        <Layout title={"Admin-all-users"}>
            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <AdminMenu />
                </div>
                <div className="basis-2/3 text-center">
                    <h1>All Users will show up here</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Users