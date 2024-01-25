import axios from "axios";
import { useSearch } from "../../searchContextAPI"
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [values, setValues] = useSearch();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:3000/api/v1/product/search/${values.keyword}`);

            setValues({ ...values, results: data });
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="text-center">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />

                <button type="submit" className={`btn btn-sm ml-1 btn-success`}>
                    Search
                </button>
            </form>
        </div>

    )
}

export default SearchInput