import Layout from "../layout/Layout"
import style from "../CustomCSS/Contact.module.css"
import { CgWebsite } from "react-icons/cg";
import { BsTelephoneInbound } from "react-icons/bs";
import { SlEarphonesAlt } from "react-icons/sl";


const PolicyPage = () => {
  return (
    <Layout title={'Policy Page'}>
      <div className="flex flex-wrap flex-row">
        <div className={`${style.contactBorderRight} basis-1/1 md:basis-1/2 `}>
          <img src="./public/images/policy.jpg" alt="contact_us" className="my-[50px] mx-auto"></img>
        </div>
        <div className="basis-1/1 md:basis-1/2">
          <div>
            <h2 className="font-bold text-3xl text-gray-600 uppercase tracking-[2px] px-[10px] py-[5px] md:mt-[50px] md:ml-[20px]" >Our Policy</h2>
            <p><span className="font-bold md:ml-[20px]">Age Restriction:</span><span className="pl-[10px]">You must be at least 18 years old or above to use our website and place orders.</span></p>
            <p><span className="font-bold md:ml-[20px]">Age Restriction:</span><span className="pl-[10px]">You must be at least 18 years old or above to use our website and place orders.</span></p>
            <p><span className="font-bold md:ml-[20px]">Age Restriction:</span><span className="pl-[10px]">You must be at least 18 years old or above to use our website and place orders.</span></p>
            <p><span className="font-bold md:ml-[20px]">Age Restriction:</span><span className="pl-[10px]">You must be at least 18 years old or above to use our website and place orders.</span></p>
            <p><span className="font-bold md:ml-[20px]">Age Restriction:</span><span className="pl-[10px]">You must be at least 18 years old or above to use our website and place orders.</span></p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PolicyPage