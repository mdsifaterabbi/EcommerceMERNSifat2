import Layout from "../layout/Layout"
import style from "../CustomCSS/Contact.module.css"
import { CgWebsite } from "react-icons/cg";
import { BsTelephoneInbound } from "react-icons/bs";
import { SlEarphonesAlt } from "react-icons/sl";

const ContactPage = () => {
    return (
        <Layout title={'Contact'}>
            <div className="flex flex-wrap flex-row">
                <div className={`${style.contactBorderRight} basis-1/1 md:basis-1/2 `}>
                    <img src="./public/images/contact_us.jpg" alt="contact_us" className="my-[50px] mx-auto"></img>
                </div>
                <div className="basis-1/1 md:basis-1/2">
                    <div>
                        <h2 className="font-bold underline text-gray-600 uppercase tracking-[2px] px-[10px] py-[5px] md:mt-[50px] md:ml-[20px]" >contact us</h2>
                        <h3 className="text-gray-500 px-[20px] mt-[25px] mb-[25px]">Got a question or just want to chat? We're always happy to hear from you! Drop us a line below or give us a call at 555-555-5555. We're here to help you make the most of your experience</h3>
                        <div className="flex items-center justify-start mx-[20px] mb-[10px]">
                            <CgWebsite className="text-4xl" />
                            <span className="text-xl text-gray-400 pl-[20px]">www.sampleweb.com</span>
                        </div>
                        <div className="flex items-center justify-start mx-[20px] mb-[10px]">
                            <BsTelephoneInbound className="text-4xl" />
                            <span className="text-xl text-gray-400 pl-[20px]">012-364965</span>
                        </div>
                        <div className="flex items-center justify-start mx-[20px] mb-[10px]">
                            <SlEarphonesAlt className="text-4xl" />
                            <span className="text-xl text-gray-400 pl-[20px]">1800-0000-0000</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage