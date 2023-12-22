import styled from 'styled-components'
import { useSettingsContext } from '../../context/SettingsContext'
import MapData from '../../data/MissionItem/lookups/Map.json'
import { useImage } from '../../hooks'
import { AssetFolder, Map } from '../../types'

const Avatar = styled.img<{ selected: boolean }>`
    background-color: ${(props) => (props.selected ? 'green' : 'none')};

    height: 80px;
    border-radius: 10px;

    margin: 2px;
    cursor: pointer;
    &:hover {
        filter: brightness(1.2);
    }
    /* &:active {
        border: 2px solid #f45d22;
    }
    &:focus {
        border: 2px solid #f45d22;
    } */
`

const MapAvatar = ({ pk, name, order }: Map) => {
    const { map, setMap } = useSettingsContext()
    const image = useImage(AssetFolder.Avatars, name)
    return <Avatar key={pk} title={name} src={image} selected={map === pk} onClick={() => setMap(pk)} />
}

export default MapAvatar
