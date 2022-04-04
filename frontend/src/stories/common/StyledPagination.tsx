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
  activePage?: number,
  totalCount: number,
  handlePageChange: (n: number) => void,
  // handlePageChange: (selected: number) => void,
  displayCount: number,
  onClickPrev: () => void,
}

const StyledPagination = ({ activePage, totalCount, handlePageChange, displayCount }: IPaginationProps) => {
  const [page, setPage] = useState(1);
  // const pages = [...Array(totalPages).keys()].map((num) => num + 1);
  // const handlePageChange = (activePage) => {

  // }

  const onClickPrev = () => {
    if (page >= 2) {
      handlePageChange(page - 1)
    }
  }
  const onClickNext = () => {
    if (page <= totalCount / displayCount + 1) {
      handlePageChange(page + 1)
    }
  }

  return (
    <Container>
      <Pagination
        // activePage={1}
        activePage={activePage || 1}
        itemsCountPerPage={displayCount}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        // onChange={() => console.log("onChange")}
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default StyledPagination;
