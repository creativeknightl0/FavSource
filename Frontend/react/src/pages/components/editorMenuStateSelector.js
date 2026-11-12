import {Editor} from '@tiptap/core';
import {EditorStateSnapshot} from '@tiptap/react';

/** 
    * State selector for the EditorMenu component
    * Extracts the relevant editor state for rendering menu buttons
**/
export function editorMenuStateSelector({ctx = EditorStateSnapshot(Editor)}) {
    return {
        // Text formatting
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
    }
}