import React from "react";
import styled from 'styled-components';
import { Title } from '../../stories/Title';
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { Button } from "../../stories/Button";
import { faMagnifyingGlass, faHashtag } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 8rem 0;
`;

const MintingContainer = styled.div`
  width: 50rem;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 23rem;
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    gap: 2rem;
  }
`;

const ChildMinting = () => {
  const handleChangeSearchInput = (e:any) => {
    console.log(e.target.value)
  } 
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
          <Title label={'2차 NFT 등록'} size={'1.5rem'}></Title>
        </TitleContainer>

        <InputContainer>
          <FileDropBox></FileDropBox>
          <InputTextContainer>
            <InputBox
              placeholder="영감받은 원작 작품을 검색해 주세요."
              width="23rem"
              icon={faMagnifyingGlass}
              onChange={handleChangeSearchInput}
            ></InputBox>
            <InputBox
              placeholder="작품 제목"
              width="23rem"
              onChange={handleChangeTitleInput}
            ></InputBox>
            <TextAreaBox
              placeholder="작품 설명"
              width="23rem"
              rows={6}
              onChange={handleChangeDescInput}
            ></TextAreaBox>
            <InputBox
              placeholder="태그"
              width="23rem"
              icon={faHashtag}
              onChange={handleChangeTagInput}
            ></InputBox>
            <Button label={'작품 등록'} width="7rem" onClick={() => console.log('작품 등록')}></Button>
          </InputTextContainer>
        </InputContainer>
      </MintingContainer>
    </Container>
  );
};

export default ChildMinting;
