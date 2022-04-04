import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ItemProps } from "../list/Item";
import SearchResult from "../minting/SearchResult";
import { Icon } from "./Icon";

const InputDiv = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  border-bottom: solid #d9d9d9 1px;
  position: relative;
  svg {
    position: absolute;
    top: calc(50% - 0.5rem);
    left: 0.5rem;
    color: #7b7b7b;
    font-size: 1rem;
  }
`;
const SearchResults = styled.div`
  width: 23rem;
  background-color: white;
  position: absolute;
  z-index: 10;
  /* box-shadow: 0px 10px 20px rgba(32, 37, 38, 0.1),
    0px 20px 50px rgba(32, 37, 38, 0.1); */
  max-height: 9rem;
  border: 1px solid lightgray;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    /* 스크롤바 전체 영역 */
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    /* 스크롤이 움직이는 영역  */
    background-color: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    /*  스크롤  */
    background-color: rgba(102, 103, 171, 0.7);
    border-radius: 30px;
  }
  ::-webkit-scrollbar-button:end:increment {
    /*  스크롤의 화살표가 포함된 영역   */
    display: none;
  }
`;

const StyledInput = styled.input`
  padding: 0.7rem 0.7rem 0.7rem 0.1rem;
  margin-left: 2rem;
  border: none;
  width: calc(100% - 2rem);
  font-family: "SUIT", sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7b7b7b;
  }
  [type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

interface SearchBarProps {
  items: ItemProps[];
  onClickItem: (item: ItemProps) => void;
}

export const SearchBar = ({ items, onClickItem }: SearchBarProps) => {
  const [results, setResults] = useState<ItemProps[]>([]);
  const [inputKeyword, setInputKeyword] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };
  const onClick = (item: ItemProps) => {
    setInputKeyword("");
    setResults([]);
    onClickItem(item);
  };

  useEffect(() => {
    let newResult: ItemProps[] = [];
    if (items.length === 0) {
      return;
    }
    if (inputKeyword.length === 0) {
      newResult = [];
    } else {
      newResult = items.filter((item) => item.itemTitle.includes(inputKeyword));
    }
    setResults(newResult);
  }, [inputKeyword, items]);

  return (
    <>
      <InputDiv width={"23rem"}>
        <Icon mode="fas" icon={"magnifying-glass"}></Icon>
        <StyledInput
          type="text"
          value={inputKeyword}
          placeholder="영감받은 원작 작품을 검색해 주세요."
          onChange={onChange}
        ></StyledInput>
      </InputDiv>
      <SearchResults>
        {results
          ? results.map((result) => (
              <SearchResult
                key={result.tokenId}
                item={result}
                onClick={() => onClick(result)}
              ></SearchResult>
            ))
          : null}
      </SearchResults>
    </>
  );
};
