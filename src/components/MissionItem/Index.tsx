import Guide from './Guide'
import ItemList from './ItemList'
import Key from './Key'
import AllMissions from './AllMissions'
import styled from 'styled-components'
import ReserveList from './ReserveList'

const MissionItemGrid = styled.div`
    display: grid;
    grid-template-columns: 440px auto;
`

function App() {
    return (
        <MissionItemGrid>
            <ItemList />
            <AllMissions />
            <Guide />
            <Key />
            <ReserveList />
        </MissionItemGrid>
    )
}

export default App
