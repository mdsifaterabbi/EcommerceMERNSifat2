import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContextAPI"
import { useAuth } from "../authContextAPI";
import Layout from "../layout/Layout"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// import orderModel from "../../../../models/orderModel";
// import { json } from "express";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart, currentOrderId, setCurrentOrderId] = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');

    const [paymentButtonVisible, setPaymentButtonVisible] = useState(false);
    // const [currentOrderId, setCurrentOrderId] = useState('');

    const getUserInfo = async () => {
        try {
            const email = auth?.email;
            //finding user using email
            const { data } = await axios.post('http://localhost:3000/api/v1/auth/user', { email });


            setName(data?.user?.name);
            setAddress(data?.user?.address);
            setPhone(data?.user?.phone);
            setEmail(data?.user?.email);
            setAnswer(data?.user?.answer);
            setRole(data?.user?.role);
            setId(data?.user?._id);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [auth]);


    const removeCartItem = (pid) => {
        try {
            const myCart = [...cart];
            const index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));

            toast.success('Item removed');
            // Delay navigation using setTimeout
            setTimeout(() => {
                navigate("/cart");

            }, 3000); // Delay for 3 seconds (adjust as needed)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        restoreCart();
    }, [])

    const restoreCart = () => {
        const existingCartItemStr = localStorage.getItem('cart');
        const existingCartItem = JSON.parse(existingCartItemStr);
        setCart(existingCartItem);
    }

    const totalAmount = () => {
        try {
            let total = 0;
            cart?.map((p) => { total = total + p.price })
            return total;
        } catch (error) {
            console.log(error);
        }
    }

    const orderSubmit = async () => {

        try {
            if (paymentButtonVisible === false) {
                const totalProducts = cart?.length;
                const totalPrice = totalAmount();
                const productsList = []; // Declare the array
                {
                    for (let i = 0; i < cart?.length; i++) {
                        productsList.push(cart[i].name); // Populate the array
                    }
                }

                const { data } = await axios.post('http://localhost:3000/api/v1/order/create-order', {
                    "customerName": name,
                    "customerEmail": email,
                    "shippingAddress": address,
                    "customerPhone": phone,
                    "totalProducts": totalProducts,
                    "totalPrice": totalPrice,
                    "productsList": productsList,
                });

                if (data?.success) {
                    setCurrentOrderId(data?.orderId);
                    console.log("Order Id created: ", data?.orderId);
                    toast.success("Order placed successfully!");
                    setPaymentButtonVisible(true);
                }
            }


        } catch (error) {
            console.log("Error occurred in orderSubmit");
            toast.error("Order did not placed successfully");
        }

    }

    const payment = async () => {
        try {
            // const { data } = await axios.post("http://localhost:3000/api/v1/order/payment");

            const { data } = await axios.post(`http://localhost:3000/api/v1/order/payment/${currentOrderId}`);


            if (data?.success) {
                console.log(data.url);
                console.log('My Transaction id is: ', data.tran_id);
                console.log('My Order id is: ', data.orderId);
                window.location.replace(data.url);

                const res = await axios.post(`http://localhost:3000/api/v1/order/payment/success/${data.tran_id}/${data.orderId}`);

                //console.log(res?.data?.message);
                console.log(res?.data?.message);
                console.log('Tr id is: ', res?.data?.tran_id);
                console.log('Or id is: ', res?.data?.orderId);

                const res_2 = await axios.put(`http://localhost:3000/api/v1/order/payment/success/${data.tran_id}/${data.orderId}`);

                // if (res_2?.data?.success) {
                //     //toast.success('Payment successful');
                //     console.log("Updated");
                // }
                // else {
                //     toast.error('Payment Not successful');
                //     console.log('Payment not successful');
                // }
                // navigate(`http://localhost:8080/payment/success/${data.tran_id}`);



            }

            toast.success('Now you want to pay for order id ' + currentOrderId);
        } catch (error) {
            console.log(error);
            toast.error("Error occurred in payment method in cartPage");
        }
    }


    return (
        <Layout>

            <h1 className="text-center text-3xl text-slate-500">Cart Page</h1>
            <div className="flex flex-row flex-wrap my-[50px] min-h-[70vh]">
                <div className="basis-1/1 md:basis-1/6 md:border-r-[2px] border-slate-400 px-[10px] sm:text-sm md:text-lg w-[100vw] text-center">
                    Hello &nbsp;{
                        auth?.token ? <span className="badge badge-outline uppercase">{name}</span> : "Respected Customer"
                    }<br></br>
                    <p>Your Cart  {cart?.length === 1 ? 'has:' : 'have:'} {cart?.length} {cart?.length === 1 ? 'product' : 'products'} </p>
                    {
                        auth?.token ? '' : <div className="badge badge-neutral">Please Login to Checkout</div>
                    }<br></br>
                </div>
                <div className="basis-3/6 px-[10px] md:border-r-[2px] border-slate-400 text-end">

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Photo</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    cart?.map((p) =>
                                        <tr key={p._id}>
                                            <td>
                                                {p.name.substring(0, 25)} &nbsp;<br></br>
                                                <div className="badge badge-primary"><button onClick={() => navigate(`/product/${p?.slug}`)}>See Details</button></div></td>
                                            <td>
                                                {
                                                    <img src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`} alt="photo" width="80px" />
                                                }
                                            </td>
                                            <td><span className="badge badge-info">{p.price}</span></td>
                                            <td>Quantity</td>
                                            <td>

                                                <button className="badge badge-warning" onClick={() => removeCartItem(p._id)}>Remove</button>

                                            </td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="basis-2/6 text-center">
                    <h2 className="text-center">Cart Summary</h2>
                    <p className="text-center">Total | Checkout | Payment</p>
                    <hr />
                    <h5 className="mt-[25px] ml-[20px] text-gray-700 text-center">Total = <span className="badge badge-outline">$ {totalAmount()}</span> </h5>
                    <hr />
                    {
                        auth?.token ? (
                            <>
                                <h5>Shipping Address: &nbsp;<span className="uppercase">{address}</span></h5>
                                <button className="btn btn-outline btn-sm" onClick={() => { navigate('/dashboard/user/profile') }}>Change Address</button>
                            </>
                        ) : (<><button className="btn btn-outline btn-sm" onClick={() => {
                            navigate('/login', { state: "/cart" })
                        }}>Login to Add Shipping address</button></>)
                    }
                    <hr />
                    {
                        auth?.token && paymentButtonVisible === false ? (
                            <>
                                <button className="btn btn-outline btn-sm mt-[10px]" onClick={() => { orderSubmit() }}>Place Order</button>
                            </>) : ('')
                    }
                    {
                        paymentButtonVisible === true ? (<>
                            <button className="btn btn-outline btn-sm mt-[10px]" onClick={() => { payment() }}>Make Payment</button>
                        </>) : ('')
                    }

                </div>

            </div>

        </Layout >
    )
}

export default CartPage
