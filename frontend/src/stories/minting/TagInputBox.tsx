import React, { useState } from "react";
import styled from "styled-components";
import { InputBox } from "../InputBox";
import { Badge } from "../common/Badge";
import { Icon } from "../common/Icon";

const Container = styled.div`
  width: 23rem;
`;

const TagContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
  flex-wrap: wrap;
  gap: 0.3rem;
`;
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

const StyledInput = styled.input<{ isPaddingStart: boolean }>`
  padding: 0.7rem 0.7rem 0.7rem 0.1rem;
  margin-left: ${(props) => (props.isPaddingStart ? "2rem" : "0")};
  border: none;
  width: ${(props) => (props.isPaddingStart ? "calc(100% - 2rem)" : "100%")};
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

interface TagInputBoxProps {
  handleTagChanged: (label: string) => void;
}

export const TagInputBox = ({ handleTagChanged }: TagInputBoxProps) => {
  const [badgeLabelList, setBadgeLabelList] = useState<string[]>([]);
  const handleSubmit = (e: any) => {
    if (badgeLabelList.length >= 5) {
      // 태그 6개 이상은 넣을 수 없음!
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
      if (special_pattern.test(e.target.value)) {
        return;
      }
      const label = e.target.value.replace(/ /gi, "");
      if (label.length === 0) {
        e.target.value = "";
        return;
      }
      setBadgeLabelList((prev) => [...prev, label]);
      e.target.value = "";
      console.log(e.target.value);
      handleTagChanged(label);
    }
  };
  const deleteBadge = (i: number) => {
    setBadgeLabelList((prev) => [
      ...prev.slice(0, i),
      ...prev.slice(i + 1, prev.length),
    ]);
  };

  return (
    <Container>
      <TagContainer>
        {badgeLabelList.map((label, index) => (
          <Badge
            key={index}
            label={label}
            index={index}
            deleteBadge={deleteBadge}
          ></Badge>
        ))}
      </TagContainer>
      <InputDiv width={"23rem"}>
        <Icon mode="fas" icon="hashtag"></Icon>
        <StyledInput
          name="label"
          placeholder="태그"
          isPaddingStart={true}
          maxLength={20}
          onKeyDown={handleSubmit}
        ></StyledInput>
      </InputDiv>
    </Container>
  );
};
