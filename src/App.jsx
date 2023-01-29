import { Navigate, Routes, Route, NavLink, BrowserRouter, Link, Outlet } from 'react-router-dom'
import MissionItem from './components/MissionItem/Index'
import PermittedAmmo from './components/PermittedAmmo/Index'
import GlobalStyle from './GlobalStyle'
import React, { Suspense } from 'react'
import Loader from './components/Loader'
import styled from 'styled-components'
import WithSettingsContext from './context/Settings'

//const OtherComponent = React.lazy(() => import('./OtherComponent'));
const NavLinky = styled(NavLink)``
function App() {
    return (
        <WithSettingsContext>
            <GlobalStyle />
            <div className="App">
                <NavLinky to={'MissionItem'}>Missions</NavLinky> <Link to={'PermittedAmmo'}>Permitted Ammo</Link>
                <Outlet />
            </div>
        </WithSettingsContext>
    )
}

export default App
