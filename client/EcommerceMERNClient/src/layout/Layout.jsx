import Footer from "../components/Footer"
import Header from "../components/Header"
import { Helmet } from "react-helmet";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Header />

            <main>
                <Toaster />
                {children}
            </main>

            <Footer />
        </>
    )
}

export default Layout