import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

export default function EditNotePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchInitialFunc = async() => {
            const fetchInitialData = await axios.get(`http://localhost:3000/notes/${id}`);
            const data = fetchInitialData.data;
            setTitle(data.title);
            setDescription(data.description);
        }
        fetchInitialFunc();
    }, []);

    const handleUpdateFunc = async(e) => {
        e.preventDefault();
        const body = {
            title: title,
            description: description
        };
        const updateApiCall = await axios.put(
            `http://localhost:3000/notes/${id}`,
            body
        );
        const data = updateApiCall.data;
        navigate(data);
    }

    const handleGoBack = () => {
        navigate('/notes');
    }

    return (
        <div>
            <Navbar />
            <div className='p-4 flex flex-col'>
                <h3 className='text-center'>PUT /notes/:id - to update the note</h3>
                <form className='flex flex-col gap-2'>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" className='border' defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" className='border' defaultValue={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button className='p-2 bg-black text-white rounded-lg mt-4 cursor-pointer' onClick={handleUpdateFunc}>Submit</button>
                </form>
                <button className='p-2 border rounded-lg cursor-pointer mt-2' onClick={handleGoBack}>Go Back</button>
            </div>
        </div>
    )
}