import { NavLink } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {  
    font-family:"Fira Sans";
    font-size:14px;
    overflow:hidden;
    margin:0;
}

button{
  border:none;
  padding:8px 20px;
  border-radius:8px;
  cursor:pointer;
}

.btn-container:has(.kofi-button) {
		z-index: 100;
  position: fixed;
  bottom: 15px;
  right: 30px;
    }
`
export const StyledNavLink = styled(NavLink)`
    font-size: 16px;
    font-weight: bold;

    &:hover {
        color: darkorange;
    }
`
export default GlobalStyle
