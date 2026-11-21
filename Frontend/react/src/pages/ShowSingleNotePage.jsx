import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function ShowSingleNotePage() {
    const [singleNoteData, setSingleNoteData] = useState({});
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        const singleNoteFetchFunc = async() => {
            const apiCall = await axios.get(`http://localhost:3000/notes/${id}`);
            const data = apiCall.data;
            console.log(data);
            setSingleNoteData(data);
        }
        singleNoteFetchFunc();
    }, [id]);
    
    const handleEditNavigation = () => {
        navigate(`/notes/${id}/edit`);
    }

    const handleDeleteNote = async() => {
        const deleteApiCall = await axios.delete(`http://localhost:3000/notes/${id}`);
        const data = deleteApiCall.data;
        navigate(data);
    }

    const loopDescriptionFunc = () => {
        console.log()
        console.log(singleNoteData.description);
        for(let i=0; i<singleNoteData.length; i++) {
            console.log(singleNoteData.description[i]);
        }
    }

    loopDescriptionFunc();

    return(
        <div className='absolute bg-lime-200 min-h-96 min-w-xl left-1/2 top-1/2 transform -translate-1/2 -translate-y-1/2 rounded-xl p-4 flex flex-col justify-between'>
            <div className='mr-4'>
                <h3>Title: {singleNoteData.title}</h3>
                {/* <p>Description: {singleNoteData.description}</p> */}
            </div>
            <div className='flex gap-2'>
                <button className='p-2 bg-blue-500 rounded-lg text-white cursor-pointer' onClick={handleEditNavigation}>Edit</button>
                <form>
                    <button className='p-2 bg-red-500 text-white rounded-lg cursor-pointer' onClick={handleDeleteNote}>Delete</button>
                </form>
            </div>
            <div className='absolute top-0 right-0 p-3 cursor-pointer rounded-tr-xl bg-red-500 text-white'>
                X
            </div>
        </div>
    )
}