/** 
    * State selector for the EditorMenu component
    * Extracts the relevant editor state for rendering menu buttons
**/
export default function editorMenuStateSelector(ctx) {
    return {
        // Text formatting
        isBold: ctx.editor.isActive('bold') ?? false, // ?? - nullish coalescing, only if left side value in the expression is null or undefined then the right side value will be chosen, otherwise it will be the left side one
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        canClearNodes: ctx.editor.can().chain().clearNodes().run() ?? false,

        // Block types
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', {level: 1}) ?? false,
        isHeading2: ctx.editor.isActive('heading', {level: 2}) ?? false,
        isHeading3: ctx.editor.isActive('heading', {level: 3}) ?? false,
        isHeading4: ctx.editor.isActive('heading', {level: 4}) ?? false,
        isHeading5: ctx.editor.isActive('heading', {level: 5}) ?? false,
        isHeading6: ctx.editor.isActive('heading', {level: 6}) ?? false,

        // Lists and blocks
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isTaskList: ctx.editor.isActive('taskList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,

        // History
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }
}