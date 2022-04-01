import React, { useState } from "react";
import styled from "styled-components";
import { InputBox } from "../InputBox";
import { Badge } from "../common/Badge";

const Container = styled.div`
  width: 23rem;
`;

const TagContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
  flex-wrap: wrap;
  gap: 0.3rem;
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
      <InputBox
        name="label"
        placeholder="태그"
        icon="hashtag"
        width="23rem"
        maxLength={20}
        onKeyDown={handleSubmit}
      ></InputBox>
    </Container>
  );
};
