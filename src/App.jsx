import { Navigate, Routes, Route, NavLink, BrowserRouter, Link, Outlet } from 'react-router-dom'
import MissionItem from './components/MissionItem/Index'
import PermittedAmmo from './components/PermittedAmmo/Index'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import GlobalStyle from './GlobalStyle'

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello world!</div>,
        errorElement: <ErrorPage />,
    },
    {
        path: 'MissionItem',
        element: <MissionItem />,
    },
    {
        path: 'PermittedAmmo',
        element: <PermittedAmmo />,
    },
    {
        path: '*',
        element: <MissionItem />,
    },
])

function App() {
    return (
        <RouterProvider router={router}>
            <div className="App">
                hello
                <NavLink to={'MissionItem'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                    Missions
                </NavLink>
                <Link to={'MissionItem'}>Missions</Link>
                <nav>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
                {/* <NavLink to={'MissionItem'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                Missions
            </NavLink>
            <NavLink to={'PermittedAmmo'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                Ammo
            </NavLink> */}
                {/* <BrowserRouter>
            <Routes>
                <Route path='MissionItem' element={<MissionItem />} />
                <Route path='PermittedAmmo' element={<PermittedAmmo />} />
                <Route path='*' element={<Navigate to='MissionItem' replace={true} />} />
            </Routes></BrowserRouter> */}
            </div>
            <Outlet />
        </RouterProvider>
    )
}

export default App
