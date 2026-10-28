import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function EditParticularActressPage() {
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [imgSrcPreview, setImgSrcPreview] = useState(null);
    const [firstSaw, setFirstSaw] = useState('');
    const [isImgTagVisible, setIsImgTagVisible] = useState(true);
    const [isFileInpVisible, setIsFileInpVisible] = useState(true);
    const params = useParams();
    const {id} = params;
    const navigate = useNavigate();

    useEffect(() => {
        const initialExistingDataFetch = async() => {
            const apiCall = await axios.get(`http://localhost:3000/actresses/${id}`);
            console.log('apiCall: ' + apiCall);
            const data = apiCall.data;
            setName(data.name);
            setImgSrc(data.imgSrc);
            setImgSrcPreview(data.imgSrc);
            setFirstSaw(data.firstSaw);
        }
        initialExistingDataFetch();
    }, []);

    const handleChangeImage = (e) => {
        setImgSrc(e.target.files[0]);
        const fileSelected = e.target.files[0];
        const createURLFromImgObject = URL.createObjectURL(fileSelected);
        setImgSrcPreview(createURLFromImgObject);
        setIsFileInpVisible(true);
        setIsImgTagVisible(true);
    }

    const handleRemoveImage = () => {
        console.log('Remove image');
        setImgSrc(null);
        setIsImgTagVisible(false);
        setIsFileInpVisible(false);
    }

    const handleUpdateForm = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('imgSrc', imgSrc);
        formData.append('firstSaw', firstSaw);
        const apiCall = await axios.put(`http://localhost:3000/actresses/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        const navigationData = apiCall.data;
        navigate(`${navigationData}/${id}`);
    }

    return (
        <div>
            <h1 className="text-center leading-10">PUT /actresses/:id - to update the particular actress data</h1>
            <form className='flex flex-col items-center gap-2'>
                <div className='flex flex-col'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" className='border' defaultValue={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className='border bg-yellow-200' onChange={(e) => handleChangeImage(e)} hidden={isFileInpVisible} />
                    {isImgTagVisible && <div className='flex flex-col items-center gap-2'>
                        <img src={imgSrcPreview} alt="Image" />
                        <div className='border border-red-500 p-2 bg-red-500 text-white rounded cursor-pointer' onClick={handleRemoveImage}>X</div>
                    </div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" name="firstSaw" id="firstSaw" className='border' defaultValue={firstSaw} onChange={(e) => setFirstSaw(e.target.value)} />
                </div>
                <button className='bg-black text-white p-1 rounded-lg cursor-pointer mt-4' onClick={handleUpdateForm}>Submit</button>
            </form>
            <button className='border p-1 rounded-lg mt-2 cursor-pointer' onClick={() => navigate(`/actresses/${id}`)}>Go Back</button>
        </div>
    )
}