import React, { useEffect, useState } from "react";
import { FeedbackBanner } from "../../stories/feedback/FeedbackBanner";
import { FeedbackTitle } from "../../stories/feedback/FeedbackTitle";
import { FeedbackComment } from "../../stories/feedback/FeedbackComment";
import { FeedbackInputBox } from "../../stories/feedback/FeedbackInputBox";
import styled from "styled-components";
import { getItem } from "../../api/item";
import { Iitem } from "./FeedbackCreate";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedBack } from "../../api/feedback";
import { getUserInfo } from "../../api/user";
import { useRecoilValue } from "recoil";
import { userInfoState, userInfoTypes } from "../..";
import { getLevel } from "../../utils/Level";
import { errorAlert } from "../../stories/common/alert";
import { isLoggedInState } from "../..";

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
  acorn: number;
};

type answer = {
  answerNo: number;
  writer: string;
  description: string;
  createdAt: string;
  imgUrl?: string;
  profileImgUrl?: string;
  nickname: string;
  acorn: number;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // questioner도 아니고 author도 아니라면 textEditor 없애기
  const [isMine, setIsMine] = useState<boolean>(true);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const navigate = useNavigate();
  const { itemTitle, itemHash, authorAddress } = item;

  useEffect(() => {
    getItem(tokenId)
      .then((res) => {
        setItem(res.data);
        setIsLoading(true);
      })
      .catch(() => {
        errorAlert("잘못된 접근입니다.");
        navigate("/");
      });
  }, []);

  useEffect(() => {
    if (isLoading) {
      getFeedBack(articleNo)
        .then((res) => {
          return res;
        })
        .then((res) => {
          const answers = res.data.answers;
          const newAnswers: answer[] = [];
          const question = res.data.question;

          getUserInfo(question.questioner)
            .then((nick) => {
              const {
                data: { nickname, acorn },
              } = nick;
              const question = {
                ...res.data.question,
                nickname,
                acorn,
              };
              return question;
            })
            .then((question) => {
              // questioner나 답변자가 아닌 경우
              if (
                answers.length !== 0 &&
                question.questioner !== userInfo.address &&
                answers[0].writer !== userInfo.address
              ) {
                setIsMine(false);
              } else if (
                answers.length === 0 &&
                question.questioner !== userInfo.address &&
                authorAddress !== userInfo.address
              ) {
                setIsMine(false);
              }

              if (answers.length !== 0) {
                answers.map((answer: answer) =>
                  getUserInfo(answer.writer).then((nick) => {
                    const {
                      data: { nickname, acorn },
                    } = nick;
                    newAnswers.push({ ...answer, nickname, acorn });
                    const questions = {
                      question,
                      answers: newAnswers,
                    };
                    setQuestions(questions);
                  })
                );
              } else {
                setQuestions({
                  question,
                });
              }
            });
        })
        .catch(() => {
          errorAlert("잘못된 접근입니다.");
          navigate("/");
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoggedIn.isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <FeedbackBanner />
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
            address={questions.question.questioner}
            commentType="MainQuestion"
          ></FeedbackComment>
          {questions.answers &&
            questions.answers.map((answer) => (
              <FeedbackComment
                key={answer.answerNo}
                answerNo={answer.answerNo}
                profileImgUrl={answer.profileImgUrl}
                profileNickname={answer.nickname}
                profileLevel={getLevel(answer.acorn)}
                content={answer.description}
                createdAt={answer.createdAt.slice(0, 10)}
                imageUrl={answer.imgUrl}
                commentType={
                  answer.writer === questions.question.questioner
                    ? "Question"
                    : "Answer"
                }
                address={answer.writer}
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
