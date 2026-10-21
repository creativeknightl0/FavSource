import {useState} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';

export default function NewActressAddPage() {
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [firstSaw, setFirstSaw] = useState('');
    const navigate = useNavigate();

    console.log('Name: ' + name);
    console.log('Image Src: ' + imgSrc + ' ' + typeof(imgSrc));
    console.log('First Saw: ' + firstSaw);

    const handleSetImgSrcAndShowPreview = (e) => {
        setImgSrc(e.target.files[0]);
        // const file = document.querySelector('#imgSrc');
        const currentFile = e.target.files[0];
        const preview = document.querySelector('#preview');
        // console.log('file: ' + file);
        // console.log('file.value: ' + file.value);
        // const currFile = file.files[0];
        // console.log('current file: ' + currFile);
        const img = document.createElement('img');
        img.src = URL.createObjectURL(currentFile);
        preview.appendChild(img);
    }
    
    const postRequestFunc = async(evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('imgSrc', imgSrc);
        formData.append('firstSaw', firstSaw);
        console.log('formData: ' + [...formData]);
        const sendData = await axios.post(
            'http://localhost:3000/actresses',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(sendData);
        navigate(sendData.data);
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center leading-10">POST /actresses - to add new record of actress</h1>
            {/* Direct form submitting way */}
            {/* <form action="http://localhost:3000/actresses" method="POST" className="flex flex-col gap-2 items-start" encType="multipart/form-data">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="border" id="name" name="name" />
                </div>
                <div className="flex">
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className="border bg-yellow-200 cursor-pointer" onChange={(e) => handleSetImgSrcAndShowPreview(e)} />
                    <div id="preview"></div>
                </div>
                <div>
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" className="border" name="firstSaw" id="firstSaw" />
                </div>
                <button className="border cursor-pointer p-1 rounded-lg">Submit</button>
            </form> */}

            {/* Submitting form using axios */}
            <form onSubmit={postRequestFunc} method="POST" className="flex flex-col gap-2 items-center">
                <div className="flex flex-col items-center">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="border" id="name" name="name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className="border bg-yellow-200 cursor-pointer" onChange={(e) => handleSetImgSrcAndShowPreview(e)} />
                    <div id="preview"></div>
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" className="border" name="firstSaw" id="firstSaw" onChange={e => setFirstSaw(e.target.value)} />
                </div>
                <button className="border cursor-pointer p-1 rounded-lg mt-4 bg-black text-white w-32">Submit</button>
            </form>

            <button className="flex flex-col border rounded-lg cursor-pointer p-1 mt-2 w-32" onClick={() => navigate('/actresses')}>Go Back</button>
        </div>
    )
}