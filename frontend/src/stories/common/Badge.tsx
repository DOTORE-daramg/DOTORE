import React from "react";
import styled from "styled-components";

const DeleteMark = styled.span`
  margin-left: 5px;
  display: none;

  &:hover {
    cursor: pointer;
  }
`;

const BadgeContainer = styled.span`
  border-radius: 4px;
  padding: 4px 8px;
  line-height: 15px;
  background-color: #d7d8e9;
  font-size: 12px;
  font-weight: 600;
  &:hover ${DeleteMark} {
    display: inline;
  }

  &:hover {
    cursor: default;
  }
`;

const HashMark = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

interface BadgeProps {
  label: string;
}

export const Badge = ({ label }: BadgeProps) => {
  return (
    <BadgeContainer>
      <HashMark>#</HashMark>
      {label}
      <DeleteMark>X</DeleteMark>
    </BadgeContainer>
  );
};
