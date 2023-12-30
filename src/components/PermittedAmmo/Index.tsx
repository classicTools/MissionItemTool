import styled from 'styled-components'
import AnimalGrid from './AnimalGrid'
import Guide from './Guide'
import MapList from './MapList'
import AmmoList from './AmmoList'
import WithAmmoContext from '../../context/AmmoContext'
import { StyledNavLink } from '../../GlobalStyle'
import { flexR } from '../../CommonStyles'
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
    grid-template-columns: 100vw;
    justify-items: center;

    gap: 20px;
`
const InnerBody = styled.div`
    display: flex;
    gap: 20px;
`

const Header = styled.div`
    ${flexR}
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
    color: white !important;
    &:hover {
        color: darkorange !important;
    }
`
const PermittedAmmo = () => {
    return (
        <Container>
            <WithAmmoContext>
                <Header>
                    <MapList />
                    <NavLinky to="/" className={({ isActive }) => (isActive ? 'isActive' : '')}>
                        Mission Item Tool
                    </NavLinky>
                </Header>
                <Body>
                    <InnerBody>
                        <AnimalGrid />
                        <AmmoList />
                    </InnerBody>
                </Body>
            </WithAmmoContext>
            <Guide />
        </Container>
    )
}

export default PermittedAmmo
