import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <nav>
                    <header className="footer-title">Services</header>
                    <Link className="link link-hover" to="/contact">Contact</Link>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <Link className="link link-hover" to="/about">About us</Link>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <Link className="link link-hover" to="/policy">Terms of use</Link>
                </nav>
            </footer>
        </>
    )
}

export default Footer