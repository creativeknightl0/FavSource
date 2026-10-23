import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function FavActressPage() {
    const params = useParams();
    const {id} = params;
    const [allIds, setAllIds] = useState([]);
    const [currId, setCurrId] = useState(id);
    const [img, setImg] = useState(null);
    const [name, setName] = useState('');
    const [firstSaw, setFirstSaw] = useState('');
    const navigate = useNavigate();

    console.log('first id: ' + id);
    console.log('all ids: ' + allIds);
    console.log('curr id: ' + currId);

    useEffect(() => {
        try {
            const getAllIds = async() => {
                const getIds = await axios.get('http://localhost:3000/actress/ids');
                const data = getIds.data;
                setAllIds([...data]);
            }

            const getData = (async() => {
                if(currId !== id) {
                    navigate(`/actress/${currId}`);
                }
                const jsonData = await axios.get(`http://localhost:3000/actress/${currId}`);
                const singleActressData = jsonData.data;
                console.log(singleActressData);
                const actressImage = singleActressData.imgSrc;
                setImg(actressImage);
                setName(singleActressData.name);
                setFirstSaw(singleActressData.firstSaw);
            });
            
            getAllIds();
            getData();
        }
        catch(e) {
            console.log(e);
        }
    }, [currId]);

    const handleNext = (currId) => {
        for(let i=0; i<allIds.length; i++) {
            if(currId === allIds[i]) {
                setCurrId(allIds[i+1]);
            }
        }
    }

    const handlePrev = (currId) => {
        for(let i=0; i<allIds.length; i++) {
            if(allIds[i] === currId) {
                setCurrId(allIds[i-1]);
            } 
        }
    }

    const newAddForm = () => {
        navigate('/actress/new');
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-2">
                {(currId !== allIds[0]) && (
                    <button className="p-2 border rounded bg-black text-white cursor-pointer" onClick={() => handlePrev(currId)}>Prev</button>
                )}
                <div className="flex flex-col justify-center items-center bg-black rounded-lg">
                    <img src={img} alt="Image" className="rounded-lg" />
                    <div>
                        <h3 className="text-white">Name - {name}</h3>
                        <p className="text-white">First Saw - {firstSaw}</p>
                    </div>
                </div>
                {currId !== allIds[allIds.length-1] && (
                    <button className="p-2 border rounded bg-black text-white cursor-pointer" onClick={() => handleNext(currId)}>Next</button>
                )}
            </div>
            <button className="p-2 bg-black text-white rounded cursor-pointer" onClick={newAddForm}>Add new</button>
        </div>
    )
}

export default FavActressPage;