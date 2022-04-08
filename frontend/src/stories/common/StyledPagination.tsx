import React from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const Container = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #444444;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: #292929;
  }
  ul.pagination li.active {
    background-color: rgba(102, 103, 171, 0.6);
    border-radius: 45px;
  }
  .page-selection {
    width: 48px;
    height: 30px;
  }
`;

interface IPaginationProps {
  activePage: number; // 현재 페이지 번호
  totalCount: number; // 전체 페이지 수
  handlePageChange: (n: number) => void;
  displayCount: number; // 한 페이지에 몇 개의 item 보여줄건지
  pageRangeCount: number; // 페이지 번호 수 몇 개 보여줄건지. 5로 설정해놨는데 그럼 안될 듯. 하나도 없거나 페이지 수 5보다 작을때도 5가 나오는 기분입니다.
}

const StyledPagination = ({
  activePage,
  totalCount,
  handlePageChange,
  displayCount,
  pageRangeCount,
}: IPaginationProps) => {
  return (
    <Container>
      <Pagination
        // activePage={1}
        activePage={activePage || 1}
        itemsCountPerPage={displayCount}
        totalItemsCount={totalCount}
        pageRangeDisplayed={pageRangeCount}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default StyledPagination;
