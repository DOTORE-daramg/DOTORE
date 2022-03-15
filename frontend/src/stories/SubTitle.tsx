import React from 'react';
import styled from 'styled-components';

interface SubTitleProps {
  label: string,
  size?: string,
}

const Item = styled.span< {size?: string} >`
  color: #6667AB;
  font-weight: 500;
  font-size: ${(props) => props.size || '18px'};
`;

export const SubTitle = ({
  label,
  size,
}: SubTitleProps) => {
  return (
    <Item size={size}>{label}</Item>
  );
};