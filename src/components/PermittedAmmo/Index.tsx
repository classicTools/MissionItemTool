import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import AnimalGrid from './AnimalGrid'
import Guide from './Guide'
import MapList from './MapList'
import AmmoList from './AmmoList'
import WithAmmoContext from '../../context/AmmoContext'
const Body = styled.div`
    display: grid;
    grid-template-columns: 800px 400px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    gap: 20px;

    margin: 0 0 120px 0;
    background-color: #222222;
    overflow: auto;
    color: white;

    //justify-content: center;
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
`
const Divider = styled.hr`
    height: 1px;
    width: 100%;
    background-color: black;
`
const PermittedAmmo = () => {
    return (
        <WithAmmoContext>
            <Container>
                <Header>
                    <MapList />
                    <NavLink to={'../MissionItemTool'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                        Mission Item Tool
                    </NavLink>
                </Header>
                <Divider />
                <Body>
                    <AnimalGrid />
                    <AmmoList />
                </Body>
                <Guide />
            </Container>
        </WithAmmoContext>
    )
}

export default PermittedAmmo
