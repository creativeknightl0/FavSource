import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';
import ShowSingleNotePage from './ShowSingleNotePage';

export default function AllNotesPage() {
    const [allNotesData, setAllNotesData] = useState([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isSingleNoteVisible, setIsSingleNoteVisible] = useState(false);
    const [singleNoteData, setSingleNoteData] = useState({});
    const [searchInp, setSearchInp] = useState('');
    const navigate = useNavigate();

    console.log('allNotesData: ' + allNotesData);
    console.log('searchInp: ' + searchInp);

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
        setIsSingleNoteVisible(false);
        setSingleNoteData({});
    }

    return (
        <div>
            <Navbar setSearchInp={setSearchInp} />
            <div className='relative mt-4'>
                <h2 className='text-center'>GET /notes - to show all the saved notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
                    {searchInp !== '' ? (
                        allNotesData.filter(note => note.title.toLowerCase().split(' ').includes(searchInp.toLowerCase()) || note.title.toLowerCase().split('').includes(searchInp.toLowerCase()) || note.title.toLowerCase() === searchInp.toLowerCase()).map(note => {
                            return (
                                <div key={note._id} className='w-auto min-h-96 rounded-xl flex justify-center items-center bg-yellow-200 cursor-pointer' onClick={() => handleSingleNote(note._id)}>
                                    {note.title}
                                </div>
                            )
                        })
                    ) : ( 
                        allNotesData.map(note => {
                            return (
                                <div key={note._id} className="w-auto min-h-96 rounded-xl flex justify-center items-center bg-yellow-200 cursor-pointer" onClick={() => handleSingleNote(note._id)}>
                                    {note.title}
                                </div>
                            )
                        })
                    )}
                </div>
                <button className='bg-red-200 fixed bottom-4 right-4 h-16 w-16 rounded-full cursor-pointer' onClick={handleShowOverlay}>+</button>
                {isOverlayVisible && (
                    <button className='cursor-pointer bg-teal-200 fixed bottom-24 right-4 rounded-xl p-4' onClick={handleCreateNoteNavigation}>Create Note +</button>
                )}
                {isSingleNoteVisible && (
                    <ShowSingleNotePage singleNoteData={singleNoteData} handleCloseSingleNote={handleCloseSingleNote} />
                )}
            </div>
        </div>
    )
}