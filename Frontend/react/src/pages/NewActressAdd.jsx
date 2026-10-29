import { useNavigate } from "react-router-dom";

function NewActressAdd() {
    const navigate = useNavigate();

    const handlePreview = (e) => {
        const currFile = e.target.files[0];
        const preview = document.querySelector('#preview');
        const imgTag = document.createElement('img');
        imgTag.src = URL.createObjectURL(currFile);
        preview.append(imgTag);
    }

    return (
        <div>
            <h1>Add New Actress - for POST /actress</h1>
            <form className="flex flex-col items-center" action="http://localhost:3000/actress" method="POST" encType="multipart/form-data">
                <label htmlFor="name">Name:</label>
                <input className="border" type="text" name="name" id="name" />
                <div className="flex flex-col">
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className="border cursor-pointer" onChange={(e) => handlePreview(e)} />
                    <div id="preview"></div>
                </div>
                <label htmlFor="firstSaw">First Saw:</label>
                <input className="border" type="text" name="firstSaw" id="firstSaw" />
                <button className="p-2 bg-black rounded text-white cursor-pointer mt-4">Submit</button>
            </form>
            <button onClick={() => navigate('/actress')} className="p-2 rounded border text-black cursor-pointer mt-4">Go back</button>
        </div>
    )
}

export default NewActressAdd;