import React from "react";
import styled from "styled-components";
import { Image } from "../detail/Image";
import { Icon } from "../common/Icon";
import { ItemProps } from "../../stories/list/Item";

interface OriginalItemImageProps {
  item: ItemProps;
  onDeleteItem: (item: ItemProps) => void;
}

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  svg {
    color: #f64355;
    cursor: pointer;
  }
  :hover {
    svg {
      color: #ce3948;
    }
  }
`;

export const OriginalItemImage = ({
  item,
  onDeleteItem,
}: OriginalItemImageProps) => {
  return (
    <div>
      <Image
        imageUrl={item.itemHash}
        name={item.itemTitle}
        mode="trade"
      ></Image>
      <IconContainer onClick={() => onDeleteItem(item)}>
        <Icon mode="fas" icon="circle-xmark"></Icon>
      </IconContainer>
    </div>
  );
};
