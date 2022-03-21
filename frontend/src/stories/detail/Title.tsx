import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <StyledTitle>{title}</StyledTitle>;
};
