import React from "react";
import styled from "styled-components";
import { ThumbnailGrid } from "../../stories/thumbnail/ThumbnailGrid";

const dummyItemList = [
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
  {
    authorName: '',
    itemTitle: '',
    owner_address: '',
    itemImageUrl: ''
  },
]

const Container = styled.div`
  width: 64rem;
  display: flex;
  margin: auto;
  padding: 5rem 0;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    width: 40rem;
  }
  @media screen and (max-width: 500px) {
    width: 35rem;
  }
`;

const AuthoredNFTList = () => {
  return (
    <Container>
      <ThumbnailGrid
        itemList={dummyItemList}
        size='52rem'
        columnCount={4}
      ></ThumbnailGrid>
    </Container>
  );
};

export default AuthoredNFTList;
