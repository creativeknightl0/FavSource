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
            <div className='button-group'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active' : ''}
                >
                    Bold
                </button>
            </div>
        </div>
    )
}