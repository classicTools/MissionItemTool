import styled from 'styled-components'
import { useSettingsContext } from '../../context/SettingsContext'
import MapData from '../../data/MissionItem/lookups/Map.json'
import { useImage } from '../../hooks'
import { AssetFolder, Map } from '../../types'
import { useAmmoContext } from '../../context/AmmoContext'
import { transitionCss } from './Animal'
import { animalMap } from '../../data/MissionItem/Data'

const Avatar = styled.img<{ selected: boolean; outline: boolean; inAnimal: boolean }>`
    height: 80px;
    border-radius: 10px;

    margin: 2px;
    cursor: pointer;
    &:hover {
        filter: brightness(1.2);
        outline: 3px solid white;
    }

    ${(props) => props.selected && 'outline: 4px solid orange'};
    ${({ outline }) => outline && 'outline: 4px solid orange'};
    ${({ inAnimal }) => inAnimal && 'background-color: green;'}
    ${transitionCss}
`

const MapAvatar = ({ pk, name, order }: Map) => {
    const { map, setMap, animal } = useSettingsContext()
    const { hoverAnimal, setHoverMap } = useAmmoContext()
    const image = useImage(AssetFolder.Avatars, name)

    let outlineAnimal = hoverAnimal ? animalMap[hoverAnimal].includes(pk) : false
    return (
        <Avatar
            key={pk}
            title={name}
            src={image}
            onMouseEnter={() => setHoverMap(pk)}
            onMouseLeave={() => setHoverMap(null)}
            onClick={() => setMap(map === pk ? null : pk)}
            outline={outlineAnimal}
            inAnimal={animal ? animalMap[animal].includes(pk) : false}
            selected={map === pk}
        />
    )
}

export default MapAvatar
