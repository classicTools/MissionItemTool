import styled from 'styled-components'
import { useSettingsContext } from '../../context/SettingsContext'
import { useImage } from '../../hooks'
import { AssetFolder, Map } from '../../types'
import { useAmmoContext } from '../../context/AmmoContext'
import { hoveringCss, inSelectedCss, selectedCss, transitionCss } from './Animal'
import { animalMap } from '../../data/MissionItem/Data'
import { pointerCss } from '../../CommonStyles'

const Avatar = styled.img<{ selected: boolean; outline: boolean; inAnimal: boolean }>`
    height: 80px;

    border-radius: 10px 20px;

    margin: 2px;
    ${pointerCss}
    ${hoveringCss}
    

    ${(props) => props.selected && selectedCss};

    opacity: ${({ outline }) => (outline ? 1 : 0)};
    ${({ inAnimal }) => inAnimal && inSelectedCss}
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
            outline={outlineAnimal || !hoverAnimal}
            inAnimal={animal ? animalMap[animal].includes(pk) : false}
            selected={map === pk}
        />
    )
}

export default MapAvatar
