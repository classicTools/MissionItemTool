import styled from 'styled-components'
import Maps from '../../data/MissionItem/Map.json'
import sortBy from 'sort-by'

let mapfilter = () => {}
const ReserveDiv = styled.div`
    position: absolute;
    top: 210px;
    left: 1220px;
    width: 200px;
`
const ReserveList = () => {
    return (
        <ReserveDiv>
            Highlight packs & outline missions by reserve:
            {Maps.sort(sortBy('order')).map((m) => {
                let id = 'map' + m.pk
                return (
                    <div key={m.pk}>
                        <input type="radio" id={id} onClick={mapfilter} name="map" />
                        <label htmlFor={id}>{m.name}</label>
                    </div>
                )
            })}
            If a highlighted mission pack has no outlined missions, all missions can be done in the chosen reserve.
        </ReserveDiv>
    )
}

export default ReserveList
