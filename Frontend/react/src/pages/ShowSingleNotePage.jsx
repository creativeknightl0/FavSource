import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function ShowSingleNotePage() {
    const [singleNoteTitle, setSingleNoteTitle] = useState('');
    const [singleNoteDescription, setSingleNoteDescription] = useState([]);
    const [singleNoteDescriptionContent, setSingleNoteDescriptionContent] = useState([]);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        const singleNoteFetchFunc = async() => {
            const apiCall = await axios.get(`http://localhost:3000/notes/${id}`);
            const data = apiCall.data;
            console.log(data);
            setSingleNoteTitle(data.title);
            setSingleNoteDescription(data.description);
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

    const loopDescription = () => {
        // for(let i=0; i<singleNoteDescription.length; i++) {
        //     console.log(singleNoteDescription[i]);
        //     if(singleNoteDescription[i].content) {
        //         for(let j=0; j<singleNoteDescription[i].content.length; j++) {
        //             console.log(singleNoteDescription[i].content[j].text);
        //         }
        //     }
        // }
        singleNoteDescription.map(mp => {
            if(mp.content) {
                {mp.content.map(m => {
                    if(m.content) {
                        {m.content.map(c => {
                            console.log(c.text)
                        })}
                    }
                    else {
                        console.log(m.text);
                    }
                })}
            }
        })
    }

    loopDescription();

    return(
        <div className='absolute bg-lime-200 min-h-96 min-w-xl left-1/2 top-1/2 transform -translate-1/2 -translate-y-1/2 rounded-xl p-4 flex flex-col justify-between'>
            <div className='mr-4'>
                <h3>Title: {singleNoteTitle}</h3>
                <div>Description: {singleNoteDescription.map(mp => {
                        if(mp.content) {
                            {mp.content.map(m => 
                                <p>{m.text}</p>
                            )}
                        }
                    })}
                </div>
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