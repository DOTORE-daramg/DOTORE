import { IconName, IconPrefix, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";

interface IconProps {
  style: IconPrefix;
  icon: IconName;
  color?: string;
  size?: string;
}

const StyledIcon = styled.div<{ size?: string; color?: string }>`
  svg {
    color: ${(props) => (props.color ? props.color : "#000000")};
    font-size: ${(props) => (props.size ? props.size : "16px")};
  }
`;

export const Icon = ({ style, icon, color, size }: IconProps) => {
  library.add(fas, fab);

  const iconLookup: IconLookup = { prefix: style, iconName: icon };
  const iconDefiniton: IconDefinition = findIconDefinition(iconLookup);

  return (
    <StyledIcon color={color} size={size}>
      <FontAwesomeIcon icon={iconDefiniton} />
    </StyledIcon>
  );
};
