import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

export default function AllNotesPage() {
    const [allNotesData, setAllNotesData] = useState([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isSingleNoteVisible, setIsSingleNoteVisible] = useState(false);
    const [singleNoteData, setSingleNoteData] = useState({});
    const navigate = useNavigate();

    console.log('singleNoteData: ' + singleNoteData);

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

    const handleSingleNote = async(id) => {
        setIsSingleNoteVisible(true);
        console.log(id);
        const fetchSingleNoteInfo = await axios.get(`http://localhost:3000/notes/${id}`);
        console.log(fetchSingleNoteInfo);
        console.log(fetchSingleNoteInfo.data);
        const data = fetchSingleNoteInfo.data;
        setSingleNoteData(data);
    }

    const handleCloseSingleNote = () => {
        setSingleNoteData({});
        setIsSingleNoteVisible(false);
    }

    return (
        <div>
            <Navbar />
            <div className='relative mt-4'>
                <h2 className='text-center'>GET /notes - to show all the saved notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
                    {allNotesData.map(note => {
                        return (
                            <div key={note._id} className="border w-auto min-h-96 rounded-xl flex justify-center items-center bg-yellow-200 cursor-pointer" onClick={() => handleSingleNote(note._id)}>
                                {note.title}
                            </div>
                        )
                    })}
                </div>
                <button className='bg-red-200 fixed bottom-4 right-4 h-16 w-16 rounded-full cursor-pointer' onClick={handleShowOverlay}>+</button>
                {isOverlayVisible && (
                    <button className='cursor-pointer bg-teal-200 fixed bottom-24 right-4 rounded-xl border p-4' onClick={handleCreateNoteNavigation}>Create Note +</button>
                )}
                {isSingleNoteVisible && (
                    <div className='absolute border-1 bg-lime-200 min-h-96 min-w-4xl left-1/2 top-1/2 transform -translate-1/2 -translate-y-1/2 rounded-xl p-4'>
                        <div>
                            <h3>Title: {singleNoteData.title}</h3>
                            <p>Description: {singleNoteData.description}</p>
                        </div>
                        <div className='absolute top-0 right-0 p-3 cursor-pointer rounded-tr-xl bg-red-500 text-white' onClick={handleCloseSingleNote}>
                            X
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}