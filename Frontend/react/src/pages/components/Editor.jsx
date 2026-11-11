import {useEditor, EditorContent} from '@tiptap/react';
// import {FloatingMenu, BubbleMenu} from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import {TextStyleKit} from '@tiptap/extension-text-style'; {/* to get the collection of most common text styles */}
import {TaskItem, TaskList} from '@tiptap/extension-list'; {/* TaskItem for li tag and TaskList for ul tag */}
import EditorMenu from './EditorMenu';

export default function Editor() {
    const editor = useEditor({
        extensions: [StarterKit, TextStyleKit, TaskItem.configure({nested: true}), TaskList], // define our extension array
        content: '<p>Hello Mr.Saver!</p>' // initial content
    })

    return (
        <div className='border p-4 m-4'>
            <EditorMenu editor={editor} />
            {/* to show content on editor */}
            <EditorContent editor={editor} />
            {/* to show menu on empty text line */}
            {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
            {/* to show menu on selected text */}
            {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </div>
    )
}