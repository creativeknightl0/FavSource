import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function FirstPage() {
    const navigate = useNavigate();
    const [firstId, setFirstId] = useState('');

    useEffect(() => {
        const getFirstActressData = async() => {
            const data = await axios.get('http://localhost:3000/actress');
            setFirstId(data.data.id);
        }
        getFirstActressData();
    }, [])

    const startFunc = () => {
        console.log(firstId);
        navigate(`/actress/${firstId}`);
    }

    return (
        <div className="flex flex-col justify-center items-center">
          <h1>Favourite Actresses</h1>
          <button className="p-2 rounded bg-black text-white cursor-pointer" onClick={startFunc}>Start</button>
        </div>
    );
}

export default FirstPage;