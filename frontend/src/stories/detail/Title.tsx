import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  width: 400px;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
    width: 300px;
  }
`;

interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <StyledTitle>{title}</StyledTitle>;
};
