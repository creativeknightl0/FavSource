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
                const singleActressData = jsonData.data;
                const actressImage = singleActressData.imgSrc;
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

    const handleNext = () => {
        setId(prevId => prevId + 1);
    }

    const handlePrev = () => {
        setId(prevId => prevId - 1);
    }

    return (
        <div className="flex justify-center items-center gap-2">
            {id !== 1 && <button className="p-2 border rounded bg-black text-white cursor-pointer" onClick={handlePrev}>Prev</button>}
            <div className="flex flex-col justify-center items-center bg-black rounded-lg">
                <img src={img} alt="Image" className="rounded-lg" />
                <div>
                    <h3 className="text-white">Name - {name}</h3>
                    <p className="text-white">First Saw - {firstSaw}</p>
                </div>
            </div>
            {id !== 3 && <button className="p-2 border rounded bg-black text-white cursor-pointer" onClick={handleNext}>Next</button>}
        </div>
    )
}

export default FavActressPage;