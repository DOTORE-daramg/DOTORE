import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 23rem;
  height: 23rem;
  border: 4px dashed rgba(102, 103, 171, 0.55);
  box-sizing: border-box;
  border-radius: 30px;
  padding: 0.2rem;
`;

const FileDropDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: solid #fff white 1rem;
  border-radius: 25px;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: #9d9d9d;
`;

export const FileDropBox = ({
  ...props
}) => {
  return (
    <Container>
      <label htmlFor="filedropzone">
        <FileDropDiv {...props}>
          <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
        </FileDropDiv>
      </label>
      <input type="file" name="filedropzone" id="filedropzone" style={{ display: 'none' }} />
    </Container>
  );
};