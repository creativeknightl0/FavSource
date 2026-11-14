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
    }
}