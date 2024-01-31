import { useParams } from "react-router-dom"
import Layout from "../layout/Layout"
import axios from "axios";


const PaymentSuccess = () => {
    const { tranId, orderId } = useParams();

    const updatePaymentStatus = async () => {
        const { data } = await axios.put(`http://localhost:3000/api/v1/order/payment/success/${tranId}/${orderId}`);

        if (data?.success) {
            console.log(data?.updatedPaymentData);
        }

    }
    updatePaymentStatus();

    return (
        <Layout>
            <h1>Payment Success Page</h1>
            <span>
                Transaction id is: {tranId}
            </span><br></br>
            <span>order id is: {orderId}</span>
        </Layout>
    )
}

export default PaymentSuccess