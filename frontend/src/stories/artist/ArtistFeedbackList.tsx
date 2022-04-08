import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export interface IFeedback {
  articleno: number;
  yn: boolean;
  itemTitle: string;
  description: string;
  createdAt: string;
  tokenId: number;
}

interface ArtistFeedbackListProps {
  feedbackList: IFeedback[];
  width: string;
}

const Container = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

const TableContainer = styled.div`
  margin-top: 2rem;
`;

const TableHeader = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 2rem 0;
`;

const TableRow = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  height: 5rem;
  align-items: center;

  #link {
    cursor: pointer;
    :hover {
      transition: 0.3;
      color: #6667ab;
    }
  }

  @media screen and (max-width: 768px) {
    height: 3rem;
  }
`;

const TableBlock = styled.div<{ width: string }>`
  display: flex;
  width: ${(props) => props.width};
`;

const TableCell = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media screen and (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

export const ArtistFeedbackList = ({
  feedbackList,
  width,
}: ArtistFeedbackListProps) => {
  const navigate = useNavigate();
  feedbackList.map((feedback) => {
    JSON.parse(feedback.description).blocks.filter((block: any) => {
      if (block.text.length > 2) return block;
    });
    return feedback;
  });

  return (
    <Container width={width}>
      <TableContainer>
        <TableHeader>
          <TableBlock width="15%">
            <TableCell>답변 여부</TableCell>
          </TableBlock>
          <TableBlock width="33%">
            <TableCell>작품명</TableCell>
          </TableBlock>
          <TableBlock width="33%">
            <TableCell>질문 내용</TableCell>
          </TableBlock>
          <TableBlock width="19%">
            <TableCell>최근 활동일</TableCell>
          </TableBlock>
        </TableHeader>
        {feedbackList.map((feedback) => (
          <TableRow key={feedback.articleno}>
            <TableBlock width="15%">
              <TableCell>{feedback.yn ? "해결" : "미해결"}</TableCell>
            </TableBlock>
            <TableBlock
              onClick={() => navigate(`/detail/${feedback.tokenId}`)}
              id="link"
              width="33%"
            >
              <TableCell>{feedback.itemTitle}</TableCell>
            </TableBlock>
            <TableBlock
              onClick={() =>
                navigate(`/feedback/${feedback.tokenId}/${feedback.articleno}`)
              }
              id="link"
              width="33%"
            >
              <TableCell>
                {JSON.parse(feedback.description).blocks.map((block: any) =>
                  block.text.length >= 15
                    ? block.text.slice(0, 15) + "..."
                    : block.text.length > 1 && block.text
                )}
              </TableCell>
            </TableBlock>
            <TableBlock width="19%">
              <TableCell>{feedback.createdAt.slice(0, 10)}</TableCell>
            </TableBlock>
          </TableRow>
        ))}
      </TableContainer>
    </Container>
  );
};
