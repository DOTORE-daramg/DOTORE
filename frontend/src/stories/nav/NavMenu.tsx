import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  top: 55px;
  background-color: white;
  min-width: 8rem;
  height: fit-content;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  color: black;
  z-index: 1;
`;

const Item = styled.div`
  color: black;
  font-weight: 600;
  width: 7rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover ${DropDownContent} {
    display: block;
  }
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
  dropdown?: Array<string>;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const NavMenu = ({ label, dropdown, ...props }: ButtonProps) => {
  return (
    <>
      <Wrapper>
        <Item {...props}>
          {label}
          <DropDownContent>
            {dropdown &&
              dropdown.map((menu) => <DropDownItem>{menu}</DropDownItem>)}
            {/* <DropDownItem>hi</DropDownItem> */}
          </DropDownContent>
        </Item>
      </Wrapper>
    </>
  );
};
