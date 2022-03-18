import React from "react";
import styled from "styled-components";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputDiv = styled.div<{ width: string }>`
  width: ${props => props.width};
  border-bottom: solid #D9D9D9 1px;
  position: relative;
  svg {
    position :absolute;
    top: calc(50% - 0.5rem);
    left: 0.5rem;
    color: #7B7B7B;
    font-size: 1rem;
  }
`;

const StyledInput = styled.input<{ isPaddingStart :boolean }>`
  padding: 0.7rem;
  margin-left: ${props => props.isPaddingStart ? '1.3rem' : '0'};
  border: none;
  width: ${props => props.isPaddingStart ? 'calc(100% - 1.3rem)' : '100%'};
  font-family: 'SUIT', sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7B7B7B;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 0.7rem;
  border: none;
  width: 100%;
  resize: none;
  font-family: 'SUIT', sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7B7B7B;
  }
`;

interface InputProps {
  placeholder?: string,
  icon?: IconDefinition,
  width: string,
  rows?: number,
  onChange?: (event:any) => void,
}

export const InputBox = ({
  placeholder,
  icon,
  width,
  onChange,
}: InputProps) => {
  return (
    <InputDiv width={width}>
      {icon ? <FontAwesomeIcon icon={icon}></FontAwesomeIcon> : null}
      <StyledInput
        placeholder={placeholder}
        isPaddingStart={!!icon}
        onChange={onChange}
      ></StyledInput>
    </InputDiv>
  );
};

export const TextAreaBox = ({
  placeholder,
  width,
  rows,
  onChange,
}: InputProps) => {
  return (
    <InputDiv width={width}>
      <StyledTextArea
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
      ></StyledTextArea>
    </InputDiv>
  );
};

