import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function EditExistingActress() {
    const params = useParams();
    const {id} = params;
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [firstSaw, setFirstSaw] = useState('');
    const [isImgPreviewVisible, setIsImgPreviewVisible] = useState(true);
    const [isFileInputVisible, setIsFileInputVisible] = useState(false);
    const navigate = useNavigate();
    const urlForUpdateForm = `http://localhost:3000/actress/${id}?_method=PUT`;
    const urlForDeleteForm = `http://localhost:3000/actress/${id}?_method=DELETE`;

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

    const handleChangePreview = (e) => {
        const fileSelected = e.target.files[0];
        setIsImgPreviewVisible(true);
        setImgSrc(URL.createObjectURL(fileSelected));
    }

    const handleRemoveImage = () => {
        setIsImgPreviewVisible(false);
        setIsFileInputVisible(true);
    }

    return (
        <div>
            <h1>PUT /actress/:id - to edit the existing actress data</h1>
            <form action={urlForUpdateForm} method="POST" className="flex flex-col items-center gap-2" encType="multipart/form-data">
                <div className="flex flex-col">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" className="border" defaultValue={name} />
                </div>
                <div id='imgDiv' className="flex flex-col">
                    <label htmlFor="imgSrc">ImgSrc:</label>
                    {isFileInputVisible && <input type="file" name="imgSrc" id="imgSrc" className="border bg-yellow-200" onChange={(e) => handleChangePreview(e)} />}
                    {isImgPreviewVisible && <div id="preview" className='flex flex-col items-center gap-2'>
                        <img id="image" src={imgSrc} alt="Image" />
                        <button className='rounded p-2 bg-red-500 text-white cursor-pointer' onClick={handleRemoveImage}>X</button>
                    </div>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" name="firstSaw" id="firstSaw" className="border" defaultValue={firstSaw} />
                </div>
                <button className="bg-black text-white rounded-lg p-1 cursor-pointer mt-4">Submit</button>
            </form>
            <div className='mt-2 flex justify-center gap-2'>
                <form action={urlForDeleteForm} method="POST">
                    <button className='border border-red-500 rounded-lg p-1 cursor-pointer text-red-500'>Delete</button>
                </form>
                <button className="border rounded-lg p-1 cursor-pointer" onClick={() => navigate('/actress')}>Go Back</button>
            </div>
        </div>
    )
}