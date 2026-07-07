import { useEffect, useState } from "react";
import axios from 'axios';

function FavActressPage() {
    const [id, setId] = useState(1);
    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [firstSaw, setFirstSaw] = useState('');

    useEffect(() => {
        try {
            const getData = (async() => {
                const jsonData = await axios.get(`http://localhost:3000/actress/${id}`);
                console.log(jsonData);
                const singleActressData = jsonData.data;
                console.log(singleActressData);
                const actressImage = singleActressData.imgSrc;
                console.log(actressImage);
                setImg(actressImage);
                setName(singleActressData.name);
                setFirstSaw(singleActressData.firstSaw);
            });
            getData();
        }
        catch(e) {
            console.log(e);
        }
    }, [id]);

    return (
        <div className="flex flex-col justify-center items-center bg-black rounded-lg">
            <img src={img} alt="Image" className="rounded-lg" />
            <div>
                <h3 className="text-white">Name - {name}</h3>
                <p className="text-white">First Saw - {firstSaw}</p>
            </div>
        </div>
    )
}

export default FavActressPage;