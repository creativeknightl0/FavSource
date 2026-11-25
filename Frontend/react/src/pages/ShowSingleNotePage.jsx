import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function ShowSingleNotePage() {
    const [singleNoteTitle, setSingleNoteTitle] = useState('');
    const [singleNoteDescription, setSingleNoteDescription] = useState([]);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    let paragraph = '';
    let blockquote = '';
    let codeBlock = ''; 
    let h1 = ''; 
    let h2 = ''; 
    let h3 = ''; 
    let h4 = ''; 
    let h5 = ''; 
    let h6 = '';
    let bold = '';
    let italic = '';
    let strike = '';
    let code = '';
    let bulletList = [];
    let orderedList = [];
    let taskList = [];
    let horizontalRule = false;
    let hardBreak = false;

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
            if(mp.type === 'paragraph') {
                if(mp.content) {
                    {mp.content.map(m => {
                        if(m.marks) {
                            {m.marks.map(mark => {
                                if(mark.type === 'bold') {
                                    console.log('m.text for bold: ' + m.text);
                                    bold += m.text;
                                    bold += ' ';
                                }
                                else if(mark.type === 'italic') {
                                    console.log('m.text for italics: ' + m.text);
                                    italic += m.text;
                                    italic += ' ';
                                }
                                else if(mark.type === 'strike') {
                                    console.log('m.text for strike: ' + m.text);
                                    strike += m.text;
                                    strike += ' ';
                                }
                                else if(mark.type === 'code') {
                                    console.log('m.text for code: ' + m.text);
                                    code += m.text;
                                    code += ' ';
                                }
                            })}
                        }
                        if(m.type === 'hardBreak') {
                            console.log('hardBreak bool value: ' + hardBreak);
                            hardBreak = true;
                        }
                        else if(m.content) {
                            {m.content.map(c => {
                                console.log('c.text for para: ' + c.text);
                                paragraph += c.text;
                                paragraph += ' ';  
                            })}
                        }
                        else {
                            console.log('m.text for para: ' + m.text);
                            paragraph += m.text;
                            paragraph += ' ';
                        }
                    })}
                }
            }
            else if(mp.type === 'blockquote') {
                if(mp.content) {
                    {mp.content.map(m => {
                        if(m.content) {
                            {m.content.map(c => {
                                console.log('c.text for blockquote: ' + c.text);
                                blockquote += c.text;
                                blockquote += ' ';
                            })}
                        }
                        else {
                            console.log('m.text for blockquote: ' + m.text);
                            blockquote += m.text;
                            blockquote += ' ';
                        }
                    })}
                }
            }
            else if(mp.type === 'codeBlock') {
                if(mp.content) {
                    {mp.content.map(m => {
                        if(m.content) {
                            {m.content.map(c => {
                                console.log('c.text for codeBlock: ' + c.text);
                                codeBlock += c.text;
                                codeBlock += ' ';
                            })}
                        }
                        else {
                            console.log('m.text for codeBlock: ' + m.text);
                            codeBlock += m.text;
                            codeBlock += ' ';
                        }
                    })}
                }
            }
            else if(mp.type === 'heading') {
                if(mp.attrs.level === 1) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h1: ' + m.text);
                            h1 += m.text;
                            h1 += ' ';
                        })}
                    }
                }
                if(mp.attrs.level === 2) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h2: ' + m.text);
                            h2 += m.text;
                            h2 += ' ';
                        })}
                    }
                }
                if(mp.attrs.level === 3) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h4: ' + m.text);
                            h3 += m.text;
                            h3 += ' ';
                        })}
                    }
                }
                if(mp.attrs.level === 4) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h4: ' + m.text);
                            h4 += m.text;
                            h4 += ' ';
                        })}
                    }
                }
                if(mp.attrs.level === 5) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h5: ' + m.text);
                            h5 += m.text;
                            h5 += ' ';
                        })}
                    }
                }
                if(mp.attrs.level === 6) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h6: ' + m.text);
                            h6 += m.text;
                            h6 += ' ';
                        })}
                    }
                }
            }
            else if(mp.type === 'bulletList') {
                if(mp.content) {
                    {mp.content.map(m => {
                        if(m.content) {
                            {m.content.map(c => {
                                if(c.content) {
                                    {c.content.map(t => {
                                        console.log('t.text for bulletList: ' + t.text);
                                        bulletList.push(t.text);
                                    })}
                                }
                            })}
                        }
                    })}
                }
            }
            else if(mp.type === 'orderedList') {
                if(mp.content) {
                    {mp.content.map(m => {
                        if(m.content) {
                            {m.content.map(c => {
                                if(c.content) {
                                    {c.content.map(t => {
                                        console.log('t.text for orderedList: ' + t.text);
                                        orderedList.push(t.text);
                                    })}
                                }
                            })}
                        }
                    })}
                }
            }
            else if(mp.type === 'taskList') {
                if(mp.content) {
                    {mp.content.map(m => {
                        if(m.content) {
                            {m.content.map(c => {
                                if(c.content) {
                                    {c.content.map(t => {
                                        console.log('t.text for taskList: ' + t.text);
                                        taskList.push(t.text);
                                    })}
                                }
                            })}
                        }
                    })}
                }
            }
            else if(mp.type === 'horizontalRule') {
                console.log('horizontalRule bool value: ' + horizontalRule);
                horizontalRule = true;
            }
        })
    }

    loopDescription();

    return(
        <div className='absolute bg-lime-200 min-h-96 min-w-xl left-1/2 top-1/2 transform -translate-1/2 -translate-y-1/2 rounded-xl p-4 flex flex-col justify-between'>
            <div className='mr-4'>
                <h3>Title: {singleNoteTitle}</h3>
                <div>Description:
                    <p>{paragraph}</p>
                    <blockquote>{blockquote}</blockquote>
                    <pre><code>{codeBlock}</code></pre>
                    <p><strong>{bold}</strong></p>
                    <p><em>{italic}</em></p>
                    <p><s>{strike}</s></p>
                    <p><code>{code}</code></p>
                    <h1>{h1}</h1>
                    <h2>{h2}</h2>
                    <h3>{h3}</h3>
                    <h4>{h4}</h4>
                    <h5>{h5}</h5>
                    <h6>{h6}</h6>
                    <ul>
                        {bulletList.map(b => {
                            return (
                                <li>{b}</li>
                            )
                        })}
                    </ul>
                    <ol>
                        {orderedList.map(o => {
                            return (
                                <li>{o}</li>
                            )
                        })}
                    </ol>
                    <ul datatype='taskList'>
                        {taskList.map(t => {
                            return (
                                <li>
                                    <label>
                                        <input aria-label="Task item checkbox for dbjbaksdn" type="checkbox" />
                                        <span className="absolute width-[1px] h-[1px] p-0 m-[-1px] overflow-hidden clip-[rect(0px, 0px, 0px, 0px)] white-space nowrap border-[0px]">
                                            Task item checkbox for {t}
                                        </span>
                                    </label>
                                    <div>
                                        <p>{t}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    {horizontalRule === true && (
                        <hr />
                    )}
                    {hardBreak === true && (
                        <br />
                    )}
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