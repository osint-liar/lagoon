import React, {useState, useEffect, useRef} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const SqlEditor = () => {
  const [code, setCode] = useState('// type your code here');

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    //setCode(newValue);
  };

  function handleEditorWillMount(monaco) {
    //console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  function handleEditorChange(value, event) {
    // here is the current value
  }

  useEffect(() => {
    // This is where you could add editor event listeners if needed
    // Cleanup function is not needed in this case but could be useful if you add event listeners
    return () => {
      // Here you would remove any event listeners added in useEffect
    };
  }, []); // The empty array ensures this effect runs only once after the initial render


  return (
    <Editor
      theme="vs-dark"
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      beforeMount={handleEditorWillMount}
      onValidate={handleEditorValidation}
    />
  );
};

export default SqlEditor;
