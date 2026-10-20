import {useState} from 'react';
// import axios from 'axios';

export default function NewActressAddPage() {
    // const [name, setName] = useState('');
    // const [imgSrc, setImgSrc] = useState([]);
    // const [firstSaw, setFirstSaw] = useState('');

    // console.log('Name: ' + name);
    // console.log('Image Src: ' + imgSrc + ' ' + typeof(imgSrc));
    // console.log('First Saw: ' + firstSaw);

    const handleSetImgSrcAndShowPreview = (e) => {
        // setImgSrc([...imgSrc, e.target.files[0]]);
        const file = document.querySelector('#imgSrc');
        const preview = document.querySelector('#preview');
        // console.log('file: ' + file);
        // console.log('file.value: ' + file.value);
        const currFile = file.files[0];
        // console.log('current file: ' + currFile);
        const img = document.createElement('img');
        img.src = URL.createObjectURL(currFile);
        preview.appendChild(img);
    }

    // const postRequestFunc = async(evt) => {
    //     evt.preventDefault();
    //     const body = {
    //         name: name,
    //         imgSrc: imgSrc,
    //         firstSaw: firstSaw
    //     };
    //     const sendData = await axios.post(
    //         'http://localhost:3000/actresses',
    //         body
    //     );
    // }

    return (
        <div>
            <h1 className="text-left">POST /actresses - to add new record of actress</h1>
            <form action="http://localhost:3000/actresses" method="POST" className="flex flex-col gap-2 items-start" encType="multipart/form-data">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="border" id="name" name="name" />
                </div>
                <div className="flex">
                    <label htmlFor="imgSrc">Image:</label>
                    <input type="file" name="imgSrc" id="imgSrc" className="border bg-yellow-200 cursor-pointer" />
                    <div id="preview"></div>
                </div>
                <div>
                    <label htmlFor="firstSaw">First Saw:</label>
                    <input type="text" className="border" name="firstSaw" id="firstSaw" />
                </div>
                <button className="border cursor-pointer p-1 rounded-lg">Submit</button>
            </form>
        </div>
    )
}