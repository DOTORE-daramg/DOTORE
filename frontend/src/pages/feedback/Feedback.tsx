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
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";

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
  answers?: Array<answer>;
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
  const userInfo = useRecoilValue<userInfoTypes>(userInfoState);

  // questioner도 아니고 author도 아니라면 textEditor 없애기
  const [isMine, setIsMine] = useState<boolean>(true);
  const { itemTitle, itemHash, authorAddress } = item;

  useEffect(() => {
    getItem(tokenId).then((res) => {
      setItem(res.data);
    });

    getFeedBack(articleNo)
      .then((res) => {
        return res;
      })
      .then((res) => {
        const answers = res.data.answers;
        const newAnswers: answer[] = [];
        const question = res.data.question;
        console.log(res);
        getUserInfo(question.questioner)
          .then((nick) => {
            const nickname = nick.data.nickname;
            const question = {
              ...res.data.question,
              nickname,
            };
            return question;
          })
          .then((question) => {
            // console.log(question.questioner, userInfo.address);
            // questioner나 답변자가 아닌 경우
            if (
              answers.length !== 0 &&
              question.questioner !== userInfo.address &&
              answers[0].writer !== userInfo.address
            ) {
              console.log(
                question.questioner,
                answers[0].writer,
                userInfo.address
              );
              setIsMine(false);
            } else if (
              answers.length == 0 &&
              question.questioner !== userInfo.address &&
              authorAddress != userInfo.address
            ) {
              setIsMine(false);
            }

            if (answers.length !== 0) {
              console.log(answers);
              answers.map((answer: answer) => {
                getUserInfo(answer.writer).then((nick) => {
                  const nickname = nick.data.nickname;
                  newAnswers.push({ ...answer, nickname });
                  const questions = {
                    question,
                    answers: newAnswers,
                  };
                  setQuestions(questions);
                });
              });
            } else {
              setQuestions({
                question,
              });
            }
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
            imageUrl={itemHash}
          ></FeedbackTitle>
          <FeedbackComment
            articleNo={articleNo}
            profileImgUrl={questions.question.profileImgUrl}
            profileNickname={questions.question.nickname}
            profileLevel="Lv2. 청소년 도토리"
            content={questions.question.description}
            createdAt={questions.question.createdAt.slice(0, 10)}
            imageUrl={questions.question.imgUrl}
            commentType="MainQuestion"
          ></FeedbackComment>
          {questions.answers &&
            questions.answers.map((answer) => (
              <FeedbackComment
                key={answer.answerNo}
                answerNo={answer.answerNo}
                profileImgUrl={answer.profileImgUrl}
                profileNickname={answer.nickname}
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
          {isMine && (
            <FeedbackInputBox
              articleNo={articleNo}
              item={item}
            ></FeedbackInputBox>
          )}
        </Container>
      )}
    </>
  );
};

export default Feedback;
