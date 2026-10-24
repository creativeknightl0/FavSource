import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function EditExistingActress() {
    const params = useParams();
    const {id} = params;
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [firstSaw, setFirstSaw] = useState('');
    const navigate = useNavigate();
    const urlForForm = `http://localhost:3000/actress/${id}?_method=PUT`;

    useEffect(() => {
        const initialData = async() => {
            const data = await axios.get(`http://localhost:3000/actress/${id}`); // fetch existing actress data to fill on the form
            console.log(data.data);
            setName(data.data.name);
            setImgSrc(data.data.imgSrc);
            setFirstSaw(data.data.firstSaw);
        }
        initialData();
    }, []);

    const handleChangePreview = () => {
        console.log('Change Preview');
    }

    const handleRemoveImage = () => {
        const selectImgDiv = document.querySelector('#imgDiv');
        const selectImg = document.querySelector('#preview');
        selectImgDiv.removeChild(selectImg);
        const createFileInp = document.createElement('input');
        createFileInp.type = 'file';
        createFileInp.className = 'border bg-yellow-200';
        createFileInp.onClick = handleChangePreview();
        console.log(createFileInp);
        selectImgDiv.appendChild(createFileInp);
    }

    return (
        <div>
            <h1>PUT /actress/:id - to edit the existing actress data</h1>
            <form action={urlForForm} method="POST" className="flex flex-col items-center gap-2">
                <div className="flex flex-col">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" className="border" defaultValue={name} />
                </div>
                <div id='imgDiv' className="flex flex-col">
                    <label htmlFor="imgSrc">ImgSrc:</label>
                    <div id="preview" className='flex flex-col items-center gap-2'>
                        <img src={imgSrc} alt="Image" />
                        <button className='rounded p-2 bg-red-500 text-white cursor-pointer' onClick={handleRemoveImage}>X</button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" name="firstSaw" id="firstSaw" className="border" defaultValue={firstSaw} />
                </div>
                <button className="bg-black text-white rounded-lg p-1 cursor-pointer mt-4">Submit</button>
            </form>
            <button className="border rounded-lg p-1 mt-2 cursor-pointer" onClick={() => navigate('/actress')}>Go Back</button>
        </div>
    )
}