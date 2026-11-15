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
        <div className='flex gap-2 flex-wrap'>
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
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editorState.isParagraph ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                Paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editorState.isHeading1 ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editorState.isHeading2 ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                className={editorState.isHeading3 ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                className={editorState.isHeading4 ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                H4
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                className={editorState.isHeading5 ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                H5
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                className={editorState.isHeading6 ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                H6
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editorState.isBulletList ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                Bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editorState.isOrderedList ? 'is-active bg-pruple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                Ordered list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={editorState.isTaskList ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                Task list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editorState.isCodeBlock ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                Code block
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editorState.isBlockquote ? 'is-active bg-purple-300 rounded-lg p-2 cursor-pointer' : 'bg-gray-300 rounded-lg p-2 cursor-pointer'}
            >
                Blockquote
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className='bg-gray-300 p-2 rounded-lg cursor-pointer'
            >
                Horizontal rule
            </button>
            <button
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className='bg-gray-300 p-2 rounded-lg cursor-pointer'
            >
                Hard break
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                className='bg-gray-300 p-2 rounded-lg cursor-pointer'
            >
                Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                className='bg-gray-300 p-2 rounded-lg cursor-pointer'
            >
                Redo
            </button>
        </div>
    )
}