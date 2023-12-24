import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {  
    font-family:"Fira Sans";
    font-size:14px;
    overflow:hidden;
}

button{
  border:none;
  padding:8px 20px;
  border-radius:8px;
  cursor:pointer;
}
.kofi-button{
  z-index:999;
}
`

export default GlobalStyle
