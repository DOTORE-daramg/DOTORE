import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    html {
        @media screen and (max-width: 500px) {
            font-size: 7px;
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
