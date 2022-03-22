import React from "react";
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, DraftEditorCommand, AtomicBlockUtils, convertFromRaw, convertToRaw } from "draft-js";
import { mediaBlockRenderer, Image } from './MediaBlock';
import { Button } from "../Button";
import "draft-js/dist/Draft.css";

const EditorContainer = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 8px;
`;


export const TextEditor = () => {
  const [editorState, setEditorState] = React.useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  // 단축키 조작
  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // 툴바 조작
  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // 이미지 삽입
  const handleInsertImage = () => {
    const src = prompt("Please enter the URL of your picture");
    if (!src) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src });  // 새로운 이미지 엔티티 생성
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    return setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));
  };

  // data url의 이미지 파일 읽기
  // const readImageAsDataUrl = (imageData: { src: string | ArrayBuffer | null }, reader: FileReader, file: File | Blob) => {
  //   if (!file) {
  //     return ;
  //   }
  //   if (file.type === 'image/png' ||
  //     file.type === 'image/jpeg' ||
  //     file.type === 'image/gif') {
  //     reader.addEventListener("load", function () {
  //       reader.readAsDataURL(file);
  //       imageData.src = reader.result
  //     }, false)
  //   }
  // }

  const handlePastedFile = (files: Array<Blob>) => {
    if (!files) {
      return 'not-handled';
    }
    const file = files[0];
    if (file.type !== 'image/png' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/gif') {
      return 'not-handled';
    }
    console.log(file)
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: reader.result });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      setEditorState(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '));
    }, false)
    reader.readAsDataURL(file);

    return 'handled';
  }

  return (
    <>
      <button onMouseDown={(e) => handleBlockClick(e, "header-one")}>h1</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-two")}>h2</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-three")}>h3</button>
      <button onMouseDown={(e) => handleBlockClick(e, "unstyled")}>normal</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>bold</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>italic</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}>strikthrough</button>
      <button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>ol</button>
      <button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>ul</button>
      <EditorContainer>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={mediaBlockRenderer}
          placeholder="Write something!"
          handlePastedFiles={handlePastedFile}
        />
        <Button
          label='작성하기'
          onClick={() => {
            const contentState = editorState.getCurrentContent();
            convertToRaw(contentState).blocks.map(block => {
              console.log(block.text);
            })
          }}
        ></Button>
      </EditorContainer>
    </>
  );
}
