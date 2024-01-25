
const CategoryForm = ({ handleSubmitFunction, value, setValue, buttonInfo, setButtonInfo }) => {

    return (
        <>
            <div className="border-[2px] mx-[20px] my-[50px] py-[50px]">
                <form onSubmit={handleSubmitFunction} className="text-center">
                    <input type="text" placeholder="Enter new category" className="mb-[10px] border-[2px] bg-slate-600 text-white px-[5px] py-[5px] placeholder:text-white" value={value} onChange={(e) => setValue(e.target.value)} /><br></br>

                    <button type="submit" className={`btn ${buttonInfo === 'delete' ? 'btn-error' : buttonInfo === 'edit' ? 'btn-info' : 'btn-success'}`}>
                        {buttonInfo === "edit" ? "Update" : buttonInfo === "delete" ? "Delete" : "Add"}
                    </button>

                </form>
            </div>
        </>
    )
}

export default CategoryForm