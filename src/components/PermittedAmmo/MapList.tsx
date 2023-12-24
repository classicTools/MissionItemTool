import styled from 'styled-components'
import MapData from '../../data/MissionItem/lookups/Map.json'
import MapAvatar from './Map'

const ReserveBox = styled.div``

const MapList = () => {
    return (
        <ReserveBox>
            {MapData.map((m) => (
                <MapAvatar {...m} key={m.pk} />
            ))}
        </ReserveBox>
    )
}

export default MapList
