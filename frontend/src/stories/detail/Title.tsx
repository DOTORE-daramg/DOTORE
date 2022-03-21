import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div<{ color: string }>`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.color};
`;

interface TitleProps {
  title: string;
  color?: string;
}

export const Title = ({ title, color = "#6667ab" }: TitleProps) => {
  return <StyledTitle color={color}>{title}</StyledTitle>;
};
