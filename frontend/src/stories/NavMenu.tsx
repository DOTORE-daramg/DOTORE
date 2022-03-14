import React from "react";
import styled from "styled-components";

const Item = styled.div`
  color: black;
  font-family: "SUIT", sans-serif;
  font-weight: 600;
`;

interface ButtonProps {
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const NavMenu = ({ label, ...props }: ButtonProps) => {
  return <Item {...props}>{label}</Item>;
};
