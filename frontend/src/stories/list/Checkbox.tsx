import React from "react";
import styled from "styled-components";

const Container = styled.div<{ width: string }>`
  display: flex;
  width: ${(props) => (props.width ? props.width : "7rem")};
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    width: ${(props) => (props.width ? props.width : "9rem")};
  }
`;

const NoneCheckbox = styled.input`
  display: none;
  :checked + label {
    background-color: #6667ab;
  }
`;

const StyledCheckbox = styled.label`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid black;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;
interface CheckboxProps {
  label: string;
  width?: string;
}

const Name = styled.div`
  margin-left: 5px;
`;
const Checkbox = ({ label, width = "10rem" }: CheckboxProps) => {
  return (
    <Container width={width}>
      <NoneCheckbox id={label} type="checkbox" />
      <StyledCheckbox htmlFor={label}></StyledCheckbox>
      <Name>{label}</Name>
    </Container>
  );
};

export default Checkbox;
