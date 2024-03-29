import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import PermittedAmmo from './components/PermittedAmmo/Index'
import { Suspense } from 'react'
import Loader from './components/Loader'

const MissionItemTool = React.lazy(() => import('./components/MissionItem/Index'))

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <Suspense fallback={<Loader />}>
                    <App />
                </Suspense>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '',
                    element: <MissionItemTool />,
                },
                {
                    path: 'Ammo',
                    element: <PermittedAmmo />,
                },
                {
                    path: '*',
                    element: <MissionItemTool />,
                },
                {
                    path: '',
                    element: <MissionItemTool />,
                },
            ],
        },
    ],
    { basename: '/MissionItemTool' }
)

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
