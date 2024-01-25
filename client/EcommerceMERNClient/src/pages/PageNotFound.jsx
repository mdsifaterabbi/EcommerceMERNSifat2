import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'

const PageNotFound = () => {
    return (
        <Layout title={'Not Found'}>
            <div className='text-center py-[25vh]'>
                <h1 className='text-8xl font-bold'>404</h1>
                <h2 className='text-2xl font-bold'>Oops! Page Not Found</h2>
                <Link to="/home"><button className='py-[5px] px-[10px] text-black font-bold tracking-widest rounded-xl border-[2px] border-slate-300 hover:bg-green-600 hover:text-red-600 hover:border-white ease-in-out duration-300 mt-[20px]'>Go Back</button></Link>
            </div>
        </Layout>
    )
}

export default PageNotFound