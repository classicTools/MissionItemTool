import { Navigate, Routes, Route, NavLink, BrowserRouter, Link, Outlet } from 'react-router-dom'
import GlobalStyle from './GlobalStyle'
import React, { Suspense, useState } from 'react'
import Loader from './components/Loader'
import styled from 'styled-components'
import WithSettingsContext from './context/SettingsContext'
import Autocomplete from './components/Autocomplete'

//const OtherComponent = React.lazy(() => import('./OtherComponent'));

const ACBlock = styled.div`
    display: flex;
    direction: row;
`

function App() {
    const [value, setValue] = useState('')
    let test = ['dgfg', 'dhggth', 'dghdtghf', ',dththf,', 'dth,srgdthdth', 'd,gd']

    return (
        <WithSettingsContext>
            <GlobalStyle />
            <div className="App">
                {/* <ACBlock>
                    <Autocomplete
                        items={test.map((i) => ({ label: i, value: i }))}
                        value={value}
                        onInputChange={(e) => setValue(e.target.value)}
                        onSelect={(val) => setValue(val.label)}
                        width={100}
                        onlyAllowItemFromDropDown={true}
                    />
                </ACBlock> */}
                <Outlet />
            </div>
        </WithSettingsContext>
    )
}

export default App
