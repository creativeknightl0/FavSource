import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

export default function AllNotesPage() {
    const [allNotesData, setAllNotesData] = useState([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const showAllNotesFunc = async() => {
            const fetchNotes = await axios.get('http://localhost:3000/notes');
            const data = fetchNotes.data;
            setAllNotesData(data);
        }
        showAllNotesFunc();
    }, []);

    const handleShowOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    }

    const handleCreateNoteNavigation = () => {
        navigate('/notes/new');
    }

    return (
        <div>
            <Navbar />
            <div className='relative mt-4'>
                <h2 className='text-center'>GET /notes - to show all the saved notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    {allNotesData.map(note => {
                        return (
                            <div key={note._id} className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                                {note.title}
                            </div>
                        )
                    })}
                </div>
                <button className='bg-red-200 fixed bottom-4 right-4 h-16 w-16 rounded-full cursor-pointer' onClick={handleShowOverlay}>+</button>
                {isOverlayVisible && (
                    <button className='cursor-pointer bg-teal-200 fixed bottom-24 right-4 rounded-xl border p-4' onClick={handleCreateNoteNavigation}>Create Note +</button>
                )}
            </div>
        </div>
    )
}