import {Editor} from '@tiptap/core';
import {useEditorState} from '@tiptap/react';
import editorMenuStateSelector from './editorMenuStateSelector.js';

export default function EditorMenu({editor}) {
    const editorState = useEditorState({
        editor,
        selector: editorMenuStateSelector
    });

    if(!editor) {
        return null;
    }

    return(
        <div className='control-group'>
            <div className='flex gap-2'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={editorState.isItalic ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={editorState.isStrike ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={editorState.isCode ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
                >
                    Code
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    disabled={!editorState.canClearMarks}
                    className='bg-gray-300 rounded-lg p-2 cursor-pointer'
                >
                    Clear Marks
                </button>
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    disabled={!editorState.canClearNodes}
                    className='bg-gray-300 rounded-lg p-2 cursor-pointer'
                >
                    Clear Nodes
                </button>
            </div>
        </div>
    )
}