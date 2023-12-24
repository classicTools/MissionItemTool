import styled from 'styled-components'
import AnimalGrid from './AnimalGrid'
import Guide from './Guide'
import MapList from './MapList'
import AmmoList from './AmmoList'
import WithAmmoContext from '../../context/AmmoContext'
import { StyledNavLink } from '../../GlobalStyle'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    gap: 20px;

    background-color: #222222;
    overflow: auto;
    color: white;
`
const Body = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 50%);

    justify-items: center;
    justify-content: center;

    gap: 20px;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 0;
    padding: 20px;
    width: 1500px;
    justify-content: center;
    align-items: end;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid lightgray;
`
const NavLinky = styled(StyledNavLink)`
    color: white;
`
const PermittedAmmo = () => {
    return (
        <Container>
            <WithAmmoContext>
                <Header>
                    <MapList />
                    <NavLinky to={'../MissionItemTool'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                        Mission Item Tool
                    </NavLinky>
                </Header>
                <Body>
                    <AnimalGrid />
                    <AmmoList />
                </Body>
            </WithAmmoContext>
            <Guide />
        </Container>
    )
}

export default PermittedAmmo
