import React from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const Container = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
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

const StyledPagination = ({}) => {
  return (
    <Container>
      <Pagination
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={() => console.log("onChange")}
      />
    </Container>
  );
};

export default StyledPagination;
