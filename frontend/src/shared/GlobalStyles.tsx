import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    html {
        @media screen and (max-width: 768px) {
            font-size: 14px;
        }
    }
    li{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: 'SUIT', sans-serif;
        font-size: 16px;
        background-color: #FFFFFF;
        color: black;
    }
`;

export default GlobalStyles;
