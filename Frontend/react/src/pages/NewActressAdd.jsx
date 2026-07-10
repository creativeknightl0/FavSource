import { useNavigate } from "react-router-dom";

function NewActressAdd() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Add New Actress - for POST /actress</h1>
            <form className="flex flex-col items-center" action="http://localhost:3000/actress" method="post">
                <label htmlFor="name">Name:</label>
                <input className="border" type="text" name="name" id="name" />
                {/* <label htmlFor="imgSrc">Image Path:</label>
                <input type="text" name="imgSrc" id="imgSrc" />
                 */}
                <label htmlFor="firstSaw">First Saw:</label>
                <input className="border" type="text" name="firstSaw" id="firstSaw" />
                <button className="p-2 bg-black rounded text-white cursor-pointer mt-4">Submit</button>
            </form>
            <button onClick={() => navigate('/actress/1')} className="p-2 rounded border text-black cursor-pointer mt-4">Go back</button>
        </div>
    )
}

export default NewActressAdd;