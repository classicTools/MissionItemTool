import Guide from './Guide'
import ItemList from './ItemList'
import Key from './Key'
import AllMissions from './AllMissions'
import styled from 'styled-components'
import ReserveList from './ReserveList'
import WithItemsContext from '../../context/Items'
import Unlocks from './Unlocks'

const MissionItemGrid = styled.div`
    display: grid;
    grid-template-columns: 440px auto;
    height: calc(100vh - 30px);
    width: calc(100vw - 10px);
    overflow: hidden;
    outline: 1px solid red;
`
const Col = styled.div`
    max-height: 99vh;
    overflow-y: auto;
`
function App() {
    return (
        <MissionItemGrid>
            <WithItemsContext>
                <Col>
                    <ItemList />
                    <Unlocks />
                </Col>
                <Col>
                    <AllMissions />
                    <ReserveList />
                    <Guide />
                </Col>
            </WithItemsContext>
        </MissionItemGrid>
    )
}

export default App
