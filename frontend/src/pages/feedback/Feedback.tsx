import React, { useEffect, useState } from "react";
import { FeedbackBanner } from "../../stories/feedback/FeedbackBanner";
import { FeedbackTitle } from "../../stories/feedback/FeedbackTitle";
import { FeedbackComment } from "../../stories/feedback/FeedbackComment";
import { FeedbackInputBox } from "../../stories/feedback/FeedbackInputBox";
import styled from "styled-components";
import { getItem } from "../../api/item";
import { Iitem } from "./FeedbackCreate";
import { useParams } from "react-router-dom";
import { getFeedBack } from "../../api/feedback";
import { getUserInfo } from "../../api/user";

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

type questions = {
  answers: Array<answer>;
  question: question;
};

type question = {
  createdAt: string;
  description: string;
  imgUrl?: string;
  profileImgUrl?: string;
  questioner: string;
  nickname: string;
};

type answer = {
  answerNo: number;
  writer: string;
  description: string;
  createdAt: string;
  imgUrl?: string;
  profileImgUrl?: string;
  nickname: string;
};
const Feedback = () => {
  const { tokenId, articleNo } = useParams();
  const [item, setItem] = useState<Iitem>({
    authorAddress: "",
    itemTitle: "",
    itemHash: "",
    nickname: "",
    itemDescription: "",
    tokenId: Number(tokenId),
  });
  const [questions, setQuestions] = useState<questions>();

  const { itemTitle, itemHash } = item;

  useEffect(() => {
    getItem(tokenId).then((res) => {
      setItem(res.data);
    });
    getFeedBack(articleNo).then((res) => {
      console.log(res);
      const answers = res.data.answers;
      getUserInfo(res.data.question.questioner).then((nick) => {
        const nickname = nick.data.nickname;

        const question = {
          ...res.data.question,
          nickname,
        };
        console.log(answers);
        const questions = {
          question,
          answers,
        };
        setQuestions(questions);
      });
    });
  }, []);
  return (
    <>
      <FeedbackBanner></FeedbackBanner>
      {questions && (
        <Container>
          <FeedbackTitle
            itemTitle={itemTitle}
            // imageUrl={itemHash}
            imageUrl="https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg"
          ></FeedbackTitle>
          <FeedbackComment
            profileImgUrl=""
            profileNickname={questions.question.nickname}
            profileLevel="Lv2. 청소년 도토리"
            content={questions.question.description}
            createdAt={questions.question.createdAt.slice(0, 10)}
            imageUrl={questions.question.imgUrl}
            commentType="MainQuestion"
          ></FeedbackComment>
          {questions.answers.map((answer) => (
            <FeedbackComment
              key={answer.answerNo}
              profileImgUrl=""
              profileNickname={answer.writer}
              profileLevel="Lv2. 청소년 도토리"
              content={answer.description}
              createdAt={answer.createdAt.slice(0, 10)}
              imageUrl={answer.imgUrl}
              commentType={
                answer.writer === questions.question.questioner
                  ? "Question"
                  : "Answer"
              }
            ></FeedbackComment>
          ))}
          <FeedbackInputBox item={item}></FeedbackInputBox>
        </Container>
      )}
    </>
  );
};

export default Feedback;
