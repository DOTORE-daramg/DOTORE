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

export const TagInputBox = () => {
  const [badgeLabelList, setBadgeLabelList] = useState<string[]>([]);
  const [form, setForm] = useState({
    label: "",
  });
  const { label } = form;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBadgeLabelList((prev) => [...prev, label]);
    setForm({
      label: "",
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("on Change");
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <Container>
      <TagContainer>
        {badgeLabelList.map((label) => (
          <Badge key={label} label={label}></Badge>
        ))}
      </TagContainer>
      <form onSubmit={handleSubmit}>
        <InputBox
          value={label}
          name="label"
          placeholder="태그"
          icon="hashtag"
          width="23rem"
          maxLength={20}
          onChange={onChange}
        ></InputBox>
      </form>
    </Container>
  );
};
