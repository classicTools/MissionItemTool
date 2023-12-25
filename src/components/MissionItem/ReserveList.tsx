import styled from 'styled-components'
import Maps from '../../data/MissionItem/lookups/Map.json'
import sortBy from 'sort-by'
import { useSettingsContext } from '../../context/SettingsContext'
import { useItemHoverContext } from '../../context/ItemHover'
import MissionKey from './MissionKey'

import Sync from './Sync'
import { Anchor } from '../genericElements'

const ReserveDiv = styled.div`
    position: absolute;
    bottom: 1180px;
    left: 800px;
    width: 250px;
    user-select: none;
`
const ReserveOption = styled.div`
    cursor: pointer;
    input,
    label {
        cursor: inherit;
    }
`
const OptionsBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    text-indent: 20px;
`
const ReserveList = () => {
    const { map, setMap } = useSettingsContext()
    const { setItemHovered } = useItemHoverContext()
    return (
        <Anchor>
            <ReserveDiv onMouseEnter={() => setItemHovered(null)}>
                <Sync />
                Highlight packs & missions by reserve:
                <br />
                <OptionsBox>
                    {Maps.sort(sortBy('order')).map((m) => {
                        let id = 'map' + m.pk
                        return (
                            <ReserveOption key={m.pk}>
                                <input type="radio" id={id} onChange={() => setMap(m.pk)} name="map" checked={map === m.pk} />
                                <label htmlFor={id}>{m.name}</label>
                            </ReserveOption>
                        )
                    })}
                    <ReserveOption key={null}>
                        <input type="radio" id="map0" onChange={() => setMap(null)} name="map" />
                        <label htmlFor="map0">None</label>
                    </ReserveOption>
                </OptionsBox>
                <br />
                If a highlighted mission pack has no outlined missions, all missions can be done in the chosen reserve.
                <br />
                <br />
                <MissionKey />
            </ReserveDiv>
        </Anchor>
    )
}

export default ReserveList
