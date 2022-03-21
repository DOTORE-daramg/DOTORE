import React from 'react';
import styled from 'styled-components';

interface FeedbackToggleButtonProps {
  leftLabel: string;
  rightLabel: string;
  selected: 0 | 1;
}

const ToggleButtonSpanContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15rem;
  @media screen and (max-width: 768px) {
    font-size: 10rem;
    width: 13rem;
  }
`;

const ToggleButtonSpan = styled.span<{ isSelected: boolean }>`
  font-size: 1.5rem;
  font-weight: ${props => props.isSelected ? '800' : '500'};
  color: ${props => props.isSelected ? '#6667AB' : '#626262'};
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const FeedbackToggleButton = ({
  leftLabel,
  rightLabel,
  selected
}: FeedbackToggleButtonProps) => {
  return (
    <ToggleButtonSpanContainer>
      <ToggleButtonSpan isSelected={selected === 0}>
        {leftLabel}
      </ToggleButtonSpan>
      <ToggleButtonSpan isSelected={selected === 1}>
        {rightLabel}
      </ToggleButtonSpan>
    </ToggleButtonSpanContainer>
  );
};

