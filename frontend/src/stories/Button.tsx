import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  /* background-color: #6667ab; */
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 20px;
  color: white;
  font-family: "SUIT", sans-serif;
  font-size: 1rem;
  width: ${(props) => props.width};
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  width?: string;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: (e?: any) => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" {...props}>
      {props.label}
    </StyledButton>
  );
};
