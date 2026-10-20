import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router';
import axios from 'axios';

export default function ParticularActressPage() {
    const {id} = useParams();
    const [particularActressData, setParticularActressData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const functionAPI = async() => {
            const apiCall = await axios.get(`http://localhost:3000/actresses/${id}`);
            const data = apiCall.data;
            setParticularActressData(data);
        }
        functionAPI();
    }, [particularActressData]);

    const handleGoBack = () => {
        navigate('/actresses');
    };

    return (
        <div>
            <div className="bg-black p-4 text-white rounded-xl m-4">
                <img src={particularActressData.imgSrc} alt="Image" className="w-full" />
                <h1>{particularActressData.name}</h1>
                <h3>{particularActressData.firstSaw}</h3>
            </div>
            <button className="border p-2 rounded-lg cursor-pointer text-black" onClick={handleGoBack}>
                Go back
            </button>
        </div>
    )
}