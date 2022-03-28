import React, { ReactEventHandler, useState } from "react";
import styled from "styled-components";
import { TEProps, TextEditor } from "../common/TextEditor";

const Container = styled.div`
  width: 100%;
`;

export const FeedbackInputBox = ({ item }: TEProps) => {
  const [] = useState();

  return (
    <Container>
      <TextEditor item={item}></TextEditor>
    </Container>
  );
};
