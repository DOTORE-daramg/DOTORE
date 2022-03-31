import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  top: 50px;
  background-color: white;
  min-width: 8rem;
  height: fit-content;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  color: black;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const Item = styled.div`
  color: black;
  font-weight: 600;
  width: 7rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DropDownItem = styled.div`
  cursor: pointer;
  text-align: center;
  margin: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

interface ButtonProps {
  label: string;
  /**
   * 드롭다운에 들어갈 세부 메뉴들
   */
  link?: Array<string>;
  dropdown?: Array<string>;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const NavMenu = ({
  label,
  dropdown,
  link,
  onClick,
  ...props
}: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Wrapper onClick={onClick}>
        <Item {...props}>{label}</Item>
        <DropDownContent>
          {dropdown &&
            link &&
            dropdown.map((menu, index) => (
              <DropDownItem onClick={() => navigate(link[index])} key={index}>
                {menu}
              </DropDownItem>
            ))}
          {/* <DropDownItem>hi</DropDownItem> */}
        </DropDownContent>
      </Wrapper>
    </>
  );
};
