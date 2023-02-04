import styled from 'styled-components'
import Maps from '../../data/MissionItem/Map.json'
import sortBy from 'sort-by'
import { useSettingsContext } from '../../context/Settings'
import { useItemsContext } from '../../context/Items'
import { useItemHoverContext } from '../../context/ItemHover'

let mapfilter = () => {}
const ReserveDiv = styled.div`
    position: relative;
    bottom: 1600px;
    left: 760px;
    width: 200px;
    user-select: none;
`
const ReserveOption = styled.div`
    cursor: pointer;
    input,
    label {
        cursor: inherit;
    }
`
const ReserveList = () => {
    const { setMap } = useSettingsContext()
    const { setItemHovered } = useItemHoverContext()
    return (
        <ReserveDiv onMouseEnter={() => setItemHovered(null)}>
            Highlight packs & missions by reserve:
            <br />
            {Maps.sort(sortBy('order')).map((m) => {
                let id = 'map' + m.pk
                return (
                    <ReserveOption key={m.pk}>
                        <input type="radio" id={id} onClick={() => setMap(m.pk)} name="map" />
                        <label htmlFor={id}>{m.name}</label>
                    </ReserveOption>
                )
            })}
            <ReserveOption key={null}>
                <input type="radio" id="map0" onClick={() => setMap(null)} name="map" />
                <label htmlFor="map0">None</label>
            </ReserveOption>
            <br />
            If a highlighted mission pack has no outlined missions, all missions can be done in the chosen reserve.
        </ReserveDiv>
    )
}

export default ReserveList
