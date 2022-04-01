import React, { useEffect } from "react";
import styled from "styled-components";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./common/Icon";

const InputDiv = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  border-bottom: solid #d9d9d9 1px;
  position: relative;
  svg {
    position: absolute;
    top: calc(50% - 0.5rem);
    left: 0.5rem;
    color: #7b7b7b;
    font-size: 1rem;
  }
`;

const StyledInput = styled.input<{ isPaddingStart: boolean }>`
  padding: 0.7rem;
  margin-left: ${(props) => (props.isPaddingStart ? "1.3rem" : "0")};
  border: none;
  width: ${(props) => (props.isPaddingStart ? "calc(100% - 1.3rem)" : "100%")};
  font-family: "SUIT", sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7b7b7b;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 0.7rem;
  border: none;
  width: 100%;
  resize: none;
  font-family: "SUIT", sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7b7b7b;
  }
`;

interface InputProps {
  placeholder?: string;
  icon?: IconName;
  width: string;
  rows?: number;
  maxLength?: number;
  name?: string;
  value?: string;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onChange?: (event: any) => void;
}

export const InputBox = ({
  placeholder,
  icon,
  width,
  maxLength = 100,
  onBlur,
  name,
  value,
  onKeyDown,
  onChange,
  ...props
}: InputProps) => {
  return (
    <InputDiv width={width}>
      {icon ? <Icon mode="fas" icon={icon}></Icon> : null}
      <StyledInput
        name={name}
        value={value}
        placeholder={placeholder}
        isPaddingStart={!!icon}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        onChange={onChange}
      ></StyledInput>
    </InputDiv>
  );
};

export const TextAreaBox = ({
  placeholder,
  width,
  rows,
  maxLength = 100,
  value,
  onBlur,
  onChange,
}: InputProps) => {
  return (
    <InputDiv width={width}>
      <StyledTextArea
        placeholder={placeholder}
        rows={rows}
        onBlur={onBlur}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      ></StyledTextArea>
    </InputDiv>
  );
};
