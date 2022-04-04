import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import {
  ArtistFeedbackList,
  IFeedback,
} from "../../stories/artist/ArtistFeedbackList";
import { FeedbackToggleButtons } from "../../stories/artist/FeedbackToggleButtons";
import { getReqFeedbacks, getResFeedbacks } from "../../api/artist";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 5rem 2rem;
  font-size: 1rem;
  min-height: 22rem;
  align-items: center;
  flex-direction: column;

  #nothing {
    padding-top: 5rem;
  }
`;

const TopContainer = styled.div<{ width: string }>`
  display: flex;
  width: ${(props) => props.width};
`;

const FeedbackList = () => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const width = isPc ? "52rem" : isTablet ? "32rem" : "24rem";
  const [selectedIndex, setSelectedIndex] = useState<0 | 1>(0); // 0: 받은 질문, 1: 보낸 질문
  const [feedbackList, setFeedbackList] = useState<IFeedback[]>();
  const { userAddress } = useParams();

  const handleToggleSelectedIndex = () => {
    setSelectedIndex((prev) => (prev === 1 ? 0 : 1));
  };

  useEffect(() => {
    if (userAddress) {
      if (selectedIndex === 0) {
        getResFeedbacks(userAddress).then((res) => {
          if (res.data.data.length > 0) {
            setFeedbackList(res.data.data);
          } else {
            setFeedbackList([]);
          }
        });
      } else {
        getReqFeedbacks(userAddress).then((res) => {
          if (res.data.data.length > 0) {
            setFeedbackList(res.data.data);
          } else {
            setFeedbackList([]);
          }
        });
      }
    }
  }, [selectedIndex]);
  return (
    <Container>
      <TopContainer width={width}>
        <FeedbackToggleButtons
          leftLabel="받은 질문"
          rightLabel="보낸 질문"
          selected={selectedIndex}
          handleToggleSelectedIndex={handleToggleSelectedIndex}
        ></FeedbackToggleButtons>
      </TopContainer>
      {feedbackList && feedbackList.length > 0 ? (
        <ArtistFeedbackList
          feedbackList={feedbackList}
          width={width}
        ></ArtistFeedbackList>
      ) : (
        <div id="nothing">아직 질문이 없습니다.</div>
      )}
    </Container>
  );
};

export default FeedbackList;
