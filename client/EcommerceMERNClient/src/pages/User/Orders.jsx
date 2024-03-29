import Layout from "../../layout/Layout"
import UserMenu from "./UserMenu"

const Orders = () => {
    return (
        <Layout title={"user orders"}>
            <div className="flex flex-row flex-wrap justify-center items-center w-[100%] min-h-[70vh]">
                <div className="basis-1/3 border text-center mt-[50px] mb-[50px]">
                    <UserMenu />
                </div>
                <div className="basis-2/3 text-center">
                    <h1>user orders</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Orders