import React, { ReactEventHandler, useState } from 'react';
import styled from 'styled-components';
import { TextEditor } from '../common/TextEditor';

const Container = styled.div`
  width: 100%;
`;

export const FeedbackInputBox = () => {
  const [] = useState();

  return (
    <Container>
      <TextEditor></TextEditor>
    </Container>
  );
};

