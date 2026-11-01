import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';

export default function AllNotesPage() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const navigate = useNavigate();

    const handleShowOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    }

    const handleCreateNote = () => {
        navigate('/notes/new');
    }

    return (
        <div>
            <Navbar />
            <div className='relative mt-4'>
                <h2 className='text-center'>GET /notes - to show all the saved notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                    <div className="border w-auto min-h-80 rounded-xl flex justify-center items-center bg-yellow-200">
                        1
                    </div>
                </div>
                <button className='bg-red-200 fixed bottom-4 right-4 h-16 w-16 rounded-full cursor-pointer' onClick={handleShowOverlay}>+</button>
                {isOverlayVisible && (
                    <button className='cursor-pointer bg-teal-200 fixed bottom-24 right-4 rounded-xl border p-4' onClick={handleCreateNote}>Create Note +</button>
                )}
            </div>
        </div>
    )
}