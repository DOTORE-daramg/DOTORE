import React from "react";
import styled from "styled-components";

const Container = styled.div<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#6667ab" : "black")};
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid #6667ab" : "none"};
  width: fit-content;
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

interface CatetgoryProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}
const Category = ({ label, isSelected, onClick }: CatetgoryProps) => {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      {label}
    </Container>
  );
};

export default Category;
