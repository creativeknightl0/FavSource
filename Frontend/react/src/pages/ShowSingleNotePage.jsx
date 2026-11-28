import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';

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
    let contentArr = [];

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
                                    bold = m.text;
                                    contentArr.push({type: 'bold', content: bold});
                                }
                                else if(mark.type === 'italic') {
                                    console.log('m.text for italics: ' + m.text);
                                    italic = m.text;
                                    contentArr.push({type: 'italic', content: italic});
                                }
                                else if(mark.type === 'strike') {
                                    console.log('m.text for strike: ' + m.text);
                                    strike = m.text;
                                    contentArr.push({type: 'strike', content: strike});
                                }
                                else if(mark.type === 'code') {
                                    console.log('m.text for code: ' + m.text);
                                    code = m.text;
                                    contentArr.push({type: 'code', content: code});
                                }
                            })}
                        }
                        else if(m.type === 'hardBreak') {
                            console.log('hardBreak bool value: ' + hardBreak);
                            hardBreak = true;
                            contentArr.push({type: 'hardBreak', content: hardBreak});
                        }
                        else {
                            console.log('m.text for paragraph: ' + paragraph);
                            paragraph = m.text;
                            contentArr.push({type: 'paragraph', content: paragraph});
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
                                blockquote = c.text;
                                contentArr.push({type: 'blockquote', content: blockquote});
                            })}
                        }
                        else {
                            console.log('m.text for blockquote: ' + m.text);
                            blockquote = m.text;
                            contentArr.push({type: 'blockquote', content: blockquote});
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
                                codeBlock = c.text;
                                contentArr.push({type: 'codeBlock', content: codeBlock});
                            })}
                        }
                        else {
                            console.log('m.text for codeBlock: ' + m.text);
                            codeBlock = m.text;
                            contentArr.push({type: 'codeBlock', content: codeBlock});
                        }
                    })}
                }
            }
            else if(mp.type === 'heading') {
                if(mp.attrs.level === 1) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h1: ' + m.text);
                            h1 = m.text;
                            contentArr.push({type: 'h1', content: h1});
                        })}
                    }
                }
                if(mp.attrs.level === 2) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h2: ' + m.text);
                            h2 = m.text;
                            contentArr.push({type: 'h2', content: h2});
                        })}
                    }
                }
                if(mp.attrs.level === 3) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h3: ' + m.text);
                            h3 = m.text;
                            contentArr.push({type: 'h3', content: h3});
                        })}
                    }
                }
                if(mp.attrs.level === 4) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h4: ' + m.text);
                            h4 = m.text;
                            contentArr.push({type: 'h4', content: h4});
                        })}
                    }
                }
                if(mp.attrs.level === 5) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h5: ' + m.text);
                            h5 = m.text;
                            contentArr.push({type: 'h5', content: h5});
                        })}
                    }
                }
                if(mp.attrs.level === 6) {
                    if(mp.content) {
                        {mp.content.map(m => {
                            console.log('m.text for h6: ' + m.text);
                            h6 = m.text;
                            contentArr.push({type: 'h6', content: h6});
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
                    contentArr.push({type: 'bulletList', content: bulletList});
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
                    contentArr.push({type: 'orderedList', content: orderedList});
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
                    contentArr.push({type: 'taskList', content: taskList});
                }
            }
            else if(mp.type === 'horizontalRule') {
                console.log('horizontalRule bool value: ' + horizontalRule);
                horizontalRule = true;
                contentArr.push({type: 'horizontalRule', content: horizontalRule});
            }
        })
    }

    loopDescription();
    console.log('contentArr: ' + JSON.stringify(contentArr));

    return(
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex flex-col p-4'>
                <div className='flex flex-col gap-2'>
                    <h3>Title: {singleNoteTitle}</h3>
                    <div>
                        <h3>Description:</h3>
                        <div className='border p-4 flex flex-col'>
                            {contentArr.map(content => {
                                return (
                                    <div id="content">
                                        {content.type === 'paragraph' ? (
                                            <p>{content.content}</p>
                                        ) : content.type === 'blockquote' ? (
                                            <blockquote>{content.content}</blockquote>
                                        ) : content.type === 'codeBlock' ? (
                                            <pre><code>{content.content}</code></pre>
                                        ) : content.type === 'h1' ? (
                                            <h1>{content.content}</h1>
                                        ) : content.type === 'h2' ? (
                                            <h2>{content.content}</h2>
                                        ) : content.type === 'h3' ? (
                                            <h3>{content.content}</h3>
                                        ) : content.type === 'h4' ? (
                                            <h4>{content.content}</h4>
                                        ) : content.type === 'h5' ? (
                                            <h5>{content.content}</h5>
                                        ) : content.type === 'h6' ? (
                                            <h6>{content.content}</h6>
                                        ): content.type === 'bold' ? (
                                            <p><strong>{content.content}</strong></p>
                                        ) : content.type === 'italic' ? (
                                            <p><em>{content.content}</em></p>
                                        ) : content.type === 'strike' ? (
                                            <p><s>{content.content}</s></p>
                                        ) : content.type === 'code' ? (
                                            <code>{content.content}</code>
                                        ) 
                                        : content.type === 'bulletList' ? (
                                            <ul>
                                                {content.content.map(str => {
                                                    return (
                                                        <li>{str}</li>
                                                    )
                                                })}
                                            </ul>
                                        ) 
                                        : content.type === 'orderedList' ? (
                                            <ol>
                                                {content.content.map(str => {
                                                    return (
                                                        <li>{str}</li>
                                                    )
                                                })}
                                            </ol>
                                        ) : content.type === 'taskList' ? (
                                            <ul datatype='taskList'>
                                                {content.content.map(str => {
                                                    return (
                                                        <li>
                                                            <label>
                                                                <input aria-label="Task item checkbox" type="checkbox" />
                                                                <span className="absolute width-[1px] h-[1px] p-0 m-[-1px] overflow-hidden clip-[rect(0px, 0px, 0px, 0px)] white-space nowrap border-[0px]">
                                                                    Task item checkbox
                                                                </span>
                                                            </label>
                                                            <div>
                                                                <p>{str}</p>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        ) : content.type === 'horizontalRule' && content.content === true ? (
                                            <hr />
                                        ) : content.type === 'hardBreak' && content.content === true && (
                                            <br />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 mt-4'>
                    <button className='p-2 bg-blue-500 rounded-lg text-white cursor-pointer' onClick={handleEditNavigation}>Edit</button>
                    <form>
                        <button className='p-2 bg-red-500 text-white rounded-lg cursor-pointer' onClick={handleDeleteNote}>Delete</button>
                    </form>
                </div>
            </div>
        </div>
    )
}