import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';

// draft 커스텀 블록 컴포넌트
interface BlockComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

// 커스텀 이미지 블록
export const Image = (props: BlockComponentProps) => {
  const { block, contentState } = props;
  const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
  return <img src={src} alt={src} role="presentation" />;
};

// 커스텀 미디어 블록
const Media = (props: BlockComponentProps) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const type = entity.getType();
  let media = null;
  if (type === 'image') {
    media = <Image {...props} />;
  }
  return media;
};

// 미디어 블록 렌더링을 위한 함수
// 에디터 컴포넌트의 blockRendererFn에서 사용
export const mediaBlockRenderer = (block: ContentBlock) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};