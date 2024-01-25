import Layout from "../layout/Layout"
import style from "../CustomCSS/Contact.module.css"
import { CgWebsite } from "react-icons/cg";
import { BsTelephoneInbound } from "react-icons/bs";
import { SlEarphonesAlt } from "react-icons/sl";

const AboutPage = () => {
    return (
        <Layout title={'About'}>
            <div className="flex flex-wrap flex-row">
                <div className={`${style.contactBorderRight} basis-1/1 md:basis-1/2 `}>
                    <img src="./public/images/about_us.jpg" alt="contact_us" className="my-[50px] mx-auto"></img>
                </div>
                <div className="basis-1/1 md:basis-1/2">
                    <div>
                        <h2 className="font-bold underline text-gray-600 uppercase tracking-[2px] px-[10px] py-[5px] md:mt-[50px] md:ml-[20px]" >about us</h2>
                        <h5 className="text-gray-500 px-[20px] mt-[25px] mb-[25px]">Welcome to Green Threads, where style meets sustainability!

                            It all started with a simple question: Why can't fashion be both gorgeous and good for the planet? We were tired of seeing the industry's harmful impact on the environment, so we set out to create a brand that proves style doesn't have to come at a cost to the earth.

                            We're not just another clothing store. We're a movement for change. We believe in conscious consumption, ethical production, and timeless designs that last. That's why every piece in our collection is crafted from sustainably sourced fabrics, manufactured with eco-friendly practices, and designed to flatter every body type.

                            Join us on a journey to create a more sustainable fashion world—one closet at a time. Whether you're looking for a statement piece for a special occasion or everyday essentials that make you feel amazing, we have something for everyone.</h5>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage