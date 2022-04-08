import React from "react";
import styled from "styled-components";

interface FeedbackToggleButtonsProps {
  leftLabel: string;
  rightLabel: string;
  selected: 0 | 1;
  handleToggleSelectedIndex: () => void;
}

const ToggleButtonSpanContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 12rem;
  @media screen and (max-width: 768px) {
    font-size: 10rem;
    width: 13rem;
  }
`;

const ToggleButtonSpan = styled.span<{ isSelected: boolean }>`
  font-size: 1.2rem;
  font-weight: ${(props) => (props.isSelected ? "800" : "500")};
  color: ${(props) => (props.isSelected ? "#6667AB" : "#626262")};
  cursor: pointer;
  user-select: none;
  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const FeedbackToggleButtons = ({
  leftLabel,
  rightLabel,
  selected,
  handleToggleSelectedIndex,
}: FeedbackToggleButtonsProps) => {
  return (
    <ToggleButtonSpanContainer>
      <ToggleButtonSpan
        onClick={selected === 0 ? undefined : handleToggleSelectedIndex}
        isSelected={selected === 0}
      >
        {leftLabel}
      </ToggleButtonSpan>
      <ToggleButtonSpan
        onClick={selected === 1 ? undefined : handleToggleSelectedIndex}
        isSelected={selected === 1}
      >
        {rightLabel}
      </ToggleButtonSpan>
    </ToggleButtonSpanContainer>
  );
};
