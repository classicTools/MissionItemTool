import styled from 'styled-components'
import { useSettingsContext } from '../../context/SettingsContext'
import MapData from '../../data/MissionItem/lookups/Map.json'
import MapAvatar from './Map'

const ReserveBox = styled.div``

const MapList = () => {
    return (
        <ReserveBox>
            {MapData.map((m) => (
                <MapAvatar {...m} />
            ))}
        </ReserveBox>
    )
}

export default MapList
