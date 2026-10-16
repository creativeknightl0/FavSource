import {useState} from 'react';
import axios from 'axios';

export default function NewActressAddPage() {
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [firstSaw, setFirstSaw] = useState('');

    console.log('Name: ' + name);
    console.log('Image Src: ' + imgSrc + ' ' + typeof(imgSrc));
    console.log('First Saw: ' + firstSaw);

    const postRequestFunc = async(evt) => {
        evt.preventDefault();
        console.log()
        const body = {
            name: name,
            imgSrc: imgSrc,
            firstSaw: firstSaw
        };
        const sendData = await axios.post(
            'http://localhost:3000/actresses',
            body
        );
    }

    return (
        <div>
            <h1 className="text-left">POST /actresses - to add new record of actress</h1>
            <form onSubmit={postRequestFunc} method="POST" className="flex flex-col gap-2 items-start">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="border" id="name" name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className="border bg-yellow-200 cursor-pointer" onChange={(e) => setImgSrc(e.target.value)} />
                    <img src={imgSrc} alt="Uploaded image" />
                </div>
                <div>
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" className="border" name="firstSaw" id="firstSaw" onChange={(e) => setFirstSaw(e.target.value)} />
                </div>
                <button className="border cursor-pointer p-1 rounded-lg">Submit</button>
            </form>
        </div>
    )
}