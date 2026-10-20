import {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

export default function AllActressesPage() {
    const [actressesData, setActressesData] = useState();
    const navigate = useNavigate();

    console.log('Actresses Data: ', actressesData);

    useEffect(() => {
        // api call to GET /actresses on backend server port to get all the actresses data at once
        const getActresses = async() => {
            const apiCall = await axios.get('http://localhost:3000/actresses');
            const data = apiCall.data;
            setActressesData(data);
        }
        getActresses();
    }, []);

    const navigateToNewRecordForm = () => {
        navigate('/actresses/new');
    }

    return (
        <div className="flex flex-col">
            <h1>GET /actresses - show all actresses</h1>
            <div className="grid sm:grid-cols-3 gap-2 p-4">
                {actressesData && actressesData.map((actress) => {
                    return (
                        <div className="bg-black text-white rounded-xl cursor-pointer" onClick={() => navigate(`/actresses/${actress._id}`)}>
                            <img src={actress.imgSrc} alt="Image" className="rounded-lg w-full h-50" />
                            <p>{actress.name}</p>
                            <p>First Saw - {actress.firstSaw}</p>
                        </div>
                    )
                })}
            </div>

            <div>
                <button onClick={navigateToNewRecordForm} className="bg-white border p-2 rounded-lg cursor-pointer">New +</button>
            </div>
        </div>
    )
}