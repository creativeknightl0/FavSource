import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

export default function CreateNotePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
 
    const handleCreateFunc = async() => {
        const body = {
            title: title,
            description: description
        }

        const createNote = await axios.post(
            'http://localhost:3000/notes',
            body
        )

        const navPath = createNote.data;

        navigate(navPath);
    }

    const handleGoBackNavigation = () => {
        navigate('/notes');
    }

    return (
        <div className='flex flex-col'>
            <Navbar />
            <form action={handleCreateFunc} className='flex flex-col p-4 gap-2'>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" className='border pl-1 pr-1' onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" className='border pl-1 pr-1' onChange={(e) => setDescription(e.target.value)}></textarea>
                <button className='p-2 text-white bg-black rounded-lg mt-4 cursor-pointer'>Submit</button>
            </form>
            <button className='m-4 p-2 bg-white border rounded-lg mt-2 cursor-pointer' onClick={handleGoBackNavigation}>Go Back</button>
        </div>
    )
}