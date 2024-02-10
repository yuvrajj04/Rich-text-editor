// Editor.js
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import './Editor.css';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (char) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Get the text of the current block
    const blockText = currentContent.getBlockForKey(selection.getStartKey()).getText();

    // Detect '#' character at the beginning of a line
    if (char === '#' && blockText.startsWith('') && selection.getStartOffset() === 0) {
      // Apply heading format
      const newState = RichUtils.toggleBlockType(editorState, 'header-one');
      if (newState) {
        onChange(newState);
        return 'handled';
      }
    }

    // Detect '*' character
    if (char === '*' && selection.getStartOffset() === 0) {
      // Apply bold format
      const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
      if (newState) {
        onChange(newState);
        return 'handled';
      }
    }

    // Detect '**' followed by a space
    if (char === '*' &&
     blockText.substring(selection.getStartOffset() - 1, selection.getStartOffset() + 1) === '**' &&
     blockText[selection.getStartOffset() + 1] === ' ') {
      // Apply red line
      const contentWithLine = Modifier.splitBlock(currentContent, selection);
      const contentWithLineAndColor = Modifier.applyInlineStyle(contentWithLine, selection, 'RED_LINE');
      const newEditorState = EditorState.push(editorState, contentWithLineAndColor, 'insert-characters');
      
      onChange(newEditorState);
      return 'handled';
    }

    // Detect '***' followed by a space
    if (char === '*' && blockText.substring(selection.getStartOffset() - 2, selection.getStartOffset() + 1) === '***' && blockText[selection.getStartOffset() + 1] === ' ') {
      // Apply underline
      const contentWithUnderline = Modifier.applyInlineStyle(currentContent, selection, 'UNDERLINE');
      const newEditorState = EditorState.push(editorState, contentWithUnderline, 'insert-characters');
      onChange(newEditorState);
      return 'handled';
    }

    // Continue typing
    return 'not-handled';
  };

  const styleMap = {
    RED_LINE: {
      borderBottom: '2px solid red',
    },
    UNDERLINE: {
      textDecoration: 'underline',
    },
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleBeforeInput={handleBeforeInput}
        customStyleMap={styleMap}
      />
    </div>
  );
};

export default DraftEditor;
