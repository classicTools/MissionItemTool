import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import AnimalGrid from './AnimalGrid'
import Guide from './Guide'
import MapList from './MapList'
import AmmoList from './AmmoList'
import WithAmmoContext from '../../context/AmmoContext'
const Body = styled.div`
    display: grid;
    width: 100vw;
    grid-template-columns: repeat(2, auto);

    justify-items: center;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 20px;
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
    width: 1500px;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 4px solid lightgray;
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
