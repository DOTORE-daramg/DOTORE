import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  background-color: #6667ab;
  padding: 10px 20px;
  color: white;
  font-family: "SUIT", sans-serif;
`;

interface ButtonProps {
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
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton type="button" {...props}>
      {label}
    </StyledButton>
  );
};
