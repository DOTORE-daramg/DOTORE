import React, { useState } from "react";
import styled from "styled-components";
import { TEProps, TextEditor } from "../common/TextEditor";

const Container = styled.div`
  width: 100%;
`;

export const FeedbackInputBox = ({ articleno, item }: TEProps) => {
  const [] = useState();

  return (
    <Container>
      <TextEditor articleno={articleno} item={item}></TextEditor>
    </Container>
  );
};
