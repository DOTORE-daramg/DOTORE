import React from "react";
import styled from "styled-components";

const Container = styled.div<SkeletonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #efefef;
  border-radius: 20px;
`;

interface SkeletonProps {
  width?: string;
  height?: string;
}

const Skeleton = ({ width, height }: SkeletonProps) => {
  return <Container width={width} height={height} />;
};

export default Skeleton;
