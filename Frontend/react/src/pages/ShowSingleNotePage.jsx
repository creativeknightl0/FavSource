import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function ShowSingleNotePage({singleNoteData, handleCloseSingleNote}) {
    const navigate = useNavigate();
    
    const handleEditNavigation = () => {
        navigate(`/notes/${singleNoteData._id}/edit`);
    }

    const handleDeleteNote = async() => {
        const deleteApiCall = await axios.delete(`http://localhost:3000/notes/${singleNoteData._id}`);
        const data = deleteApiCall.data;
        navigate(data);
    }

    return(
        <div className='absolute bg-lime-200 min-h-96 min-w-xl left-1/2 top-1/2 transform -translate-1/2 -translate-y-1/2 rounded-xl p-4 flex flex-col justify-between'>
            <div className='mr-4'>
                <h3>Title: {singleNoteData.title}</h3>
                <p>Description: {singleNoteData.description}</p>
            </div>
            <div className='flex gap-2'>
                <button className='p-2 bg-blue-500 rounded-lg text-white cursor-pointer' onClick={handleEditNavigation}>Edit</button>
                <form>
                    <button className='p-2 bg-red-500 text-white rounded-lg cursor-pointer' onClick={handleDeleteNote}>Delete</button>
                </form>
            </div>
            <div className='absolute top-0 right-0 p-3 cursor-pointer rounded-tr-xl bg-red-500 text-white' onClick={handleCloseSingleNote}>
                X
            </div>
        </div>
    )
}