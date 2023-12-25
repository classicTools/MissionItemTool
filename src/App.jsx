import { Outlet } from 'react-router-dom'
import GlobalStyle from './GlobalStyle'
import styled from 'styled-components'
import WithSettingsContext from './context/SettingsContext'

//const OtherComponent = React.lazy(() => import('./OtherComponent'));

const AppDiv = styled.div`
    //styled visited links
    a,
    a:visited {
        color: ${(props) => props.theme.fontColor};
    }

    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.fontColor};

    transition: color 500ms, background-color 500ms;
    border-color: 500ms;
`
function App() {
    return (
        <WithSettingsContext>
            <GlobalStyle />
            <AppDiv className="App">
                <Outlet />
            </AppDiv>
        </WithSettingsContext>
    )
}

export default App
