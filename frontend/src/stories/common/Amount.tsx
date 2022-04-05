import { IconName, IconPrefix } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

const AmountContainer = styled.div`
  display: flex;
  gap: 10px;

  align-items: center;
`;

const Count = styled.div<{ fontSize?: string }>`
  display: flex;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  gap: 3px;
`;

interface AmountProps {
  mode: IconPrefix;
  icon: IconName;
  iconColor?: string;
  iconSize?: string;
  count: number;
  fontSize?: string;
  unit?: string;
}

export const Amount = ({
  mode,
  icon,
  iconColor,
  iconSize,
  count,
  fontSize,
  unit,
}: AmountProps) => {
  let pCount = "";
  if (count >= 10000) {
    pCount = (count / 1000).toFixed(1) + "K";
  } else {
    pCount = count.toString();
  }

  return (
    <AmountContainer>
      <Icon mode={mode} icon={icon} color={iconColor} size={iconSize} />
      <Count className="count" fontSize={fontSize}>
        {pCount}
        {unit && <div>{unit}</div>}
      </Count>
    </AmountContainer>
  );
};
