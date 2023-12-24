import Guide from './Guide'
import ItemList from './ItemList'
import AllMissions from './AllMissions'
import styled from 'styled-components'
import ReserveList from './ReserveList'
import WithItemsContext from '../../context/ItemContext'
import Unlocks from './Unlocks'
import WithItemHoverContext from '../../context/ItemHover'
import WithMissionsContext from '../../context/MissionContext'
import WithBookmarkContext from '../../context/BookmarkContext'
import Agenda from './Agenda'
import StaticControls from './StaticControls'
import { HintImagePortal } from '../../Portal'

const MissionItemGrid = styled.div`
    display: grid;
    grid-template-columns: 440px auto;
    height: calc(100vh);
    width: calc(100vw - 10px);
    overflow: hidden;
    margin-top: 8px;
    margin-left: 8px;
`
const Col = styled.div`
    max-height: 99vh;
    overflow-y: auto;
`

const ImagePortal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 25;
    height: 0;
    width: 0;

    display: flex;
    justify-content: center;
    align-items: center;
`

function App() {
    return (
        <MissionItemGrid>
            <WithItemsContext>
                <WithItemHoverContext>
                    <WithMissionsContext>
                        <Col>
                            <ItemList />
                            <Unlocks />
                        </Col>
                        <Col>
                            <WithBookmarkContext>
                                <AllMissions />
                                <Agenda />
                                <ImagePortal id={HintImagePortal} />
                                <ReserveList />
                            </WithBookmarkContext>
                            <Guide />
                        </Col>
                    </WithMissionsContext>
                </WithItemHoverContext>
            </WithItemsContext>

            <StaticControls />
        </MissionItemGrid>
    )
}

export default App
