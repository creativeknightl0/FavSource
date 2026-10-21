import { useNavigate } from "react-router-dom";

function NewActressAdd() {
    const navigate = useNavigate();

    const handleImagePreview = (e) => {
        const firstFile = e.target.files[0];
        console.log(firstFile);
        const previewDiv = document.querySelector('#preview');
        let newImgTag = document.createElement('img');
        newImgTag.src = URL.createObjectURL(firstFile); // imp, again practice
        console.log(newImgTag);
        previewDiv.appendChild(newImgTag);
    }

    return (
        <div>
            <h1>Add New Actress - for POST /actress</h1>
            <form className="flex flex-col items-center" action="http://localhost:3000/actress" method="POST" encType="multipart/form-data">
                <label htmlFor="name">Name:</label>
                <input className="border" type="text" name="name" id="name" />
                <div className="flex flex-col">
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className="border cursor-pointer" onChange={e => handleImagePreview(e)} />
                    <div id="preview"></div>
                </div>
                <label htmlFor="firstSaw">First Saw:</label>
                <input className="border" type="text" name="firstSaw" id="firstSaw" />
                <button className="p-2 bg-black rounded text-white cursor-pointer mt-4">Submit</button>
            </form>
            <button onClick={() => navigate('/actress/1')} className="p-2 rounded border text-black cursor-pointer mt-4">Go back</button>
        </div>
    )
}

export default NewActressAdd;