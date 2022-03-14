import React from 'react';
import './title.css';

interface TitleProps {
  label: string;
  size: number;
}

export const Title = ({
  label,
  size,
}: TitleProps) => {
  return (
    <span className="title" style={{fontSize: size}}>
      {label}
    </span>
  );
};
