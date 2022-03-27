import React from "react";
import { FeedbackBanner } from "../../stories/feedback/FeedbackBanner";
import { FeedbackTitle } from "../../stories/feedback/FeedbackTitle";
import { FeedbackComment } from "../../stories/feedback/FeedbackComment";
import { FeedbackInputBox } from "../../stories/feedback/FeedbackInputBox";
import styled from "styled-components";

const dummy = {
  articleno: 0,
  question: {
    questioner: "이성재",
    description: "안녕하세요. 질문 드리겠습니다. 받아보세요.",
    created_at: "2022-03-14",
    img_url: "",
  },
  answers: [
    {
      answerno: 0,
      writer: "도토리_01",
      description: "질문 받았습니다. 답변 받아보세요.",
      img_url: "",
      created_at: "2022-03-15",
    },
    {
      answerno: 1,
      writer: "이성재",
      description: "답변 받았습니다. 질문 받아보세요.",
      img_url:
        "https://external-preview.redd.it/GHnsoZTj3vG2zaz0ARuX_OpeEAlJp40TCsDd4edm46U.jpg?auto=webp&s=475ac56e5f93cea40b6275f8a175a2f0e2f4c19e",
      created_at: "2022-03-15",
    },
  ],
};

const Container = styled.div`
  width: 64rem;
  padding: 5rem 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media screen and (max-width: 1200px) {
    width: 40rem;
  }
  @media screen and (max-width: 500px) {
    width: 23rem;
  }
`;

const Feedback = () => {
  return (
    <>
      <FeedbackBanner></FeedbackBanner>
      <Container>
        <FeedbackTitle
          itemTitle="여기 보완 필요"
          imageUrl={dummy.question.img_url}
        ></FeedbackTitle>
        <FeedbackComment
          profileImgUrl=""
          profileNickname={dummy.question.questioner}
          profileLevel={dummy.question.questioner}
          content={dummy.question.description}
          createdAt={dummy.question.created_at}
          imageUrl={dummy.question.img_url}
          commentType="MainQuestion"
        ></FeedbackComment>
        {dummy.answers.map((answer) => (
          <FeedbackComment
            key={answer.answerno}
            profileImgUrl=""
            profileNickname={answer.writer}
            profileLevel={answer.writer}
            content={answer.description}
            createdAt={answer.created_at}
            imageUrl={answer.img_url}
            commentType={
              answer.writer === dummy.question.questioner
                ? "Question"
                : "Answer"
            }
          ></FeedbackComment>
        ))}
        <FeedbackInputBox></FeedbackInputBox>
      </Container>
    </>
  );
};

export default Feedback;
