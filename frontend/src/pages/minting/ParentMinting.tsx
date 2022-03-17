import React from "react";
import styled from 'styled-components';
import { Title } from '../../stories/Title';
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { Button } from "../../stories/Button";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 5.5rem 0;
`;

const MintingContainer = styled.div`
  width: 50rem;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 19rem;
  }
`;

const TitleContainer = styled.header`
  text-align: left;
  padding-bottom: 3rem;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const InputContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ParentMinting = () => {
  const handleChangeTitleInput = (e:any) => {
    console.log(e.target.value)
  } 
  const handleChangeDescInput = (e:any) => {
    console.log(e.target.value)
  } 
  const handleChangeTagInput = (e:any) => {
    console.log(e.target.value)
  }
  return (
    <Container>
      <MintingContainer>
        <TitleContainer>
          <Title label={'1차 NFT 등록'} size={'1.5rem'}></Title>
        </TitleContainer>

        <InputContainer>
          <FileDropBox></FileDropBox>
          <InputTextContainer>
            <InputBox
              placeholder="작품 제목"
              width="19rem"
              onChange={handleChangeTitleInput}
            ></InputBox>
            <TextAreaBox
              placeholder="작품 설명"
              width="19rem"
              rows={4}
              onChange={handleChangeDescInput}
            ></TextAreaBox>
            <InputBox
              placeholder="태그"
              width="19rem"
              icon={faHashtag}
              onChange={handleChangeTagInput}
            ></InputBox>
            <Button label={'작품 등록'} onClick={() => console.log('작품 등록')}></Button>
          </InputTextContainer>
        </InputContainer>
      </MintingContainer>
    </Container>
  );
};

export default ParentMinting;
