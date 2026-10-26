import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function EditParticularActressPage() {
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [firstSaw, setFirstSaw] = useState('');
    const [isImgTagVisible, setIsImgTagVisible] = useState(true);
    const [isFileInpVisible, setIsFileInpVisible] = useState(true);
    const params = useParams();
    const {id} = params;
    console.log('id: ' + id);

    useEffect(() => {
        const initialExistingDataFetch = async() => {
            const apiCall = await axios.get(`http://localhost:3000/actresses/${id}`);
            console.log('apiCall: ' + apiCall);
            const data = apiCall.data;
            console.log('data: ' + data);
            console.log('name data: ' + data.name);
            console.log('img data: ' + data.imgSrc);
            console.log('first Saw data: ' + data.firstSaw);
            setName(data.name);
            setImgSrc(data.imgSrc);
            setFirstSaw(data.firstSaw);
        }
        initialExistingDataFetch();
    }, []);

    const handleChangeImage = (e) => {
        console.log('Change image');
        const fileSelected = e.target.files[0];
        console.log('fileSelected: ' + fileSelected);
        const createURLFromImgObject = URL.createObjectURL(fileSelected);
        console.log('createURLFromImgObject: ' + createURLFromImgObject);
        setImgSrc(createURLFromImgObject);
        setIsFileInpVisible(true);
        setIsImgTagVisible(true);
    }

    const handleRemoveImage = () => {
        console.log('Remove image');
        setImgSrc(null);
        setIsImgTagVisible(false);
        setIsFileInpVisible(false);
    }

    const handleUpdateForm = (e) => {
        e.preventdefault();
        console.log('Submit form');
    }

    return (
        <div>
            <h1 className="text-center leading-10">PUT /actresses/:id - to update the particular actress data</h1>
            <form onSubmit={e => handleUpdateForm(e)} className='flex flex-col items-center gap-2' encType="multipart/form-data">
                <div className='flex flex-col'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" className='border' defaultValue={name} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className='border bg-yellow-200' onChange={(e) => handleChangeImage(e)} hidden={isFileInpVisible} />
                    {isImgTagVisible && <div className='flex flex-col items-center gap-2'>
                        <img src={imgSrc} alt="Image" />
                        <div className='border border-red-500 p-2 bg-red-500 text-white rounded cursor-pointer' onClick={handleRemoveImage}>X</div>
                    </div>}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" name="firstSaw" id="firstSaw" className='border' defaultValue={firstSaw} />
                </div>
                <button className='bg-black text-white p-1 rounded-lg cursor-pointer mt-4'>Submit</button>
            </form>
            <button className='border p-1 rounded-lg mt-2 cursor-pointer'>Go Back</button>
        </div>
    )
}