import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const FormContainer = styled.form`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-family: 'SUIT', sans-serif;
  border: solid 1px #c0c0c0;
  border-radius: 10px;
  resize: none;
  padding: 1rem;
  ::placeholder {
    color: #7B7B7B;
  }
`;

const FileInputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`;

const FileInputButton = styled.label`
  border-radius: 10px;
  background-color: #6667AB;
  font-family: 'SUIT', sans-serif;
  padding: 10px 20px;
  color: white;
  font-weight: 400;
  display: inline-block;
  cursor: pointer;
  font-size: 1rem;
  width: 120px;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const FileList = styled.ul`
  border: solid 1px #c0c0c0;
  width: 100%;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  flex-flow: row-reverse;
`;

export const FeedbackInputBox = () => {
  return (
    <FormContainer>
      <TextArea placeholder='내용 작성' rows={6}></TextArea>
      <FileInputContainer>
        <FileInputButton htmlFor="input-file">
          파일 첨부
        </FileInputButton>
        <input type="file" name="input-file" id="input-file" style={{ display: 'none' }}/>
        <Button label='전체 삭제' backgroundColor='#6667ab' width='120px'></Button>
        <FileList></FileList>
      </FileInputContainer>
      <SubmitButtonContainer>
        <Button label='작성하기' backgroundColor='#6667ab'></Button>
      </SubmitButtonContainer>
    </FormContainer>
  );
};

