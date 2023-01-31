import { useState, useEffect } from 'react'

import { Box } from '@mui/material';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

import { useSelector } from 'react-redux';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Edit = () => {
  const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

  const letter = useSelector((state) => state.letter.value);

  useEffect(() => {
    let content = '';
    if (letter?.opening && letter?.values.length > 0 && letter?.closing) {
      content += `<p>To [Insert],</p>`;
      content += `<p>${letter.opening}</p>`;
      for (let i = 0; i < letter.values.length; i++) {
        content += `<p>${letter.values[i]}</p>`;
      };
      content += `<p>${letter.closing}</p><p>Sincerely,</p><p>[Your Name]</p>`;

      const contentBlock = htmlToDraft(content);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const _editorState = EditorState.createWithContent(contentState);
      setEditorState(_editorState);
    };
  }, [letter?.opening, letter?.values, letter?.closing]);

  return (
    <Box sx={{ my: 2 }}>
      <Editor 
        defaultEditorState={editorState}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true }
        }}
      />
  </Box>   
  )
}

export default Edit