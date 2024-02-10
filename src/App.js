// App.js
import React, { useEffect, useState } from 'react';
import Title from './Title';
import Button from './Button';
import Editor from './Editor';

const App = () => {
  const [editorContent, setEditorContent] = useState('');

  // Load saved content from localStorage when component mounts
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  // Save content to localStorage when Save button is clicked
  const handleSave = () => {
    localStorage.setItem('editorContent', editorContent);
    console.log('Content saved to localStorage');
  };

  // Update editor content state
  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  return (
    <div>
      <Title />
      <Button onClick={handleSave} />
      <Editor content={editorContent} onChange={handleEditorChange} />
    </div>
  );
};

export default App;
