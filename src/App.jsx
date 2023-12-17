import { Navigate, Routes, Route, NavLink, BrowserRouter, Link, Outlet } from 'react-router-dom'
import MissionItem from './components/MissionItem/Index'
import PermittedAmmo from './components/PermittedAmmo/Index'
import GlobalStyle from './GlobalStyle'
import React, { Suspense, useState } from 'react'
import Loader from './components/Loader'
import styled from 'styled-components'
import WithSettingsContext from './context/Settings'
import Autocomplete from './components/Autocomplete'

//const OtherComponent = React.lazy(() => import('./OtherComponent'));
const NavLinky = styled(NavLink)``

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
                <NavLinky to={'MissionItem'}>Missions</NavLinky> <Link to={'PermittedAmmo'}>Permitted Ammo</Link>
                <Outlet />
                <ACBlock>
                    <p>rgdt</p>
                    <Autocomplete
                        items={test.map((i) => ({ label: i, value: i }))}
                        value={value}
                        onInputChange={(e) => setValue(e.target.value)}
                        onSelect={(val) => setValue(val.label)}
                        width={100}
                        onlyAllowItemFromDropDown={true}
                    />
                    <p>Hello dont push me down</p>
                </ACBlock>
            </div>
        </WithSettingsContext>
    )
}

export default App
