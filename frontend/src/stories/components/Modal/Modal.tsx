import React from 'react';
import styled from "styled-components";
import { Button } from '../../Button';
import { Icon } from '../../common/Icon';

const Section = styled.div``;
const ModalContainer = styled.div`
    /* display: grid; */
    /* width: 100%; */
    /* modal container */
    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;

    position: relative;
    width: 520px;
    height: 443px;

    background: #FFFFFF;
    box-shadow: 0px 10px 20px rgba(32, 37, 38, 0.1), 0px 20px 50px rgba(32, 37, 38, 0.1);
    border-radius: 6px;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 25px 0px;
    position: static;
    width: 460px;
    height: 80px;
    left: 30px;
    right: 30px;
    top: 0px;
    /* color: #6667AB; */
    h3 {
        /* 내 정보 수정 */
        position: static;
        width: 416px;
        height: 30px;
        left: 0px;
        top: 25px;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        /* identical to box height */
        color: #6667AB;
        /* Inside auto layout */
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 20px;
    }
    icon {
        /* close icon */


        position: static;
        width: 24px;
        height: 24px;
        right: 0px;
        top: 25px;

        color: #9FABAE;

        /* Inside auto layout */

        flex: none;
        order: 1;
        flex-grow: 0;
        margin: 0px 20px;
    }
`;
const ModalBorder = styled.div`
    /* border */


    position: static;
    height: 2px;
    left: 0%;
    right: 0%;
    top: 80px;

    background: #F0F1F1;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 0px;

    width: 520px;
    height: 2px;
`;

const ModalBody = styled.div`
    /* body text */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30px 0px;
    position: static;
    width: 460px;
    height: 252px;
    left: 30px;
    top: 81px;
    /* Inside auto layout */
    flex: none;
    order: 2;
    flex-grow: 0;
    margin: 0px 0px;
    .content {
        position: static;
        width: 460px;
        height: 192px;
        left: 0px;
        top: 30px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 175%;
        /* or 32px */


        color: #3F575C;


        /* Inside auto layout */

        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 10px;
    }
`;

const ModalFooter = styled.div`
    /* footer */


    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 30px;

    position: static;
    width: 520px;
    height: 110px;
    left: 0px;
    top: 333px;

    background: #F0F1F1;

    /* Inside auto layout */

    flex: none;
    order: 3;
    flex-grow: 0;
    margin: 0px 0px;
    .buttons {
        /* buttons */


        /* Auto layout */

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;

        position: static;
        width: 235px;
        height: 50px;
        left: 255px;
        top: 30px;


        /* Inside auto layout */

        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 10px 0px;
    }
`;

export interface ModalProps {
    icon?: string;
    // disclosure: React.ComponentPropsWithRef<any>;
    title?: string;
    content?: string;
    onClose?: () => void;
    onValidate?: () => void;
}

export const Modal = ({
    icon,
    // disclosure: React.ComponentPropsWithRef<any>;
    title,
    content,
    onClose,
    onValidate,
    ...props
}: ModalProps) => {
    return (
        <Section>
            <ModalContainer>
                <ModalHeader>
                    <h3>{title}</h3>
                    <Icon style="fas" icon='xmark' color='#9FABAE' />
                </ModalHeader>
                <ModalBorder></ModalBorder>
                <ModalBody>
                    <div className="content">{content}</div>
                </ModalBody>
            </ModalContainer>
        </Section>
    );
};