import React from "react";
import styled from "styled-components";

const Item = styled.span<{ size: string }>`
  color: #6667ab;
  font-weight: 700;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${(props) => props.size};
  /* margin: 30px; */
`;

interface TitleProps {
  label: string;
  size: string;
}

export const Title = ({ label, size }: TitleProps) => {
  return <Item size={size}>{label}</Item>;
};
