import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { Icon } from "../common/Icon";

const Container = styled.div<{ width?: string; imageUrl: string }>`
  position: relative;
  width: 23rem;
  height: 23rem;
  border: 3px dashed rgba(102, 103, 171, 0.55);
  border-radius: 30px;
  padding: 0.05rem;
  background-clip: content-box;
  background-image: url(${(props) => (props.imageUrl ? props.imageUrl : "")});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  svg {
    color: #9d9d9d;
    text-align: end;
  }
`;

const FileDropDiv = styled.div<{ isShow: boolean }>`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: solid #fff white 1rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 6rem;
    display: ${(props) => (props.isShow ? "inline" : "none")};
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DeleteFile = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? "block" : "none")};
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  cursor: pointer;
  svg {
    font-size: 2rem;
  }
`;

interface FileDropBoxProps {
  width?: string;
  handleFileChanged: (file: Blob) => void;
}

export const FileDropBox = ({ handleFileChanged }: FileDropBoxProps) => {
  const [preview, setPreview] = useState<string>("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      setPreview(preview);
      handleFileChanged(file);
    },
    [handleFileChanged]
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop,
  });

  function onClickDeleteFile() {
    handleFileChanged({} as Blob);
    setPreview("");
  }

  return (
    <Container imageUrl={preview ? preview : ""}>
      <DeleteFile isShow={preview ? true : false} onClick={onClickDeleteFile}>
        <Icon mode="fas" icon={"xmark"}></Icon>
      </DeleteFile>
      <FileDropDiv
        isShow={preview ? false : true}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Icon mode="fas" icon={"image"}></Icon>
      </FileDropDiv>
    </Container>
  );
};
