import styled from 'styled-components'
import { useAmmoContext } from '../../context/AmmoContext'
import { useSettingsContext } from '../../context/SettingsContext'
import { ammoAnimal, animalAmmo } from '../../data/MissionItem/Data'
import { hoveringCss, inSelectedCss, selectedCss, siblingCss, transitionCss } from './Animal'
import { AmmoData } from '../../types'
import { pointerCss } from '../../CommonStyles'

const AmmoEntry = styled.div<{ inAnimal: boolean; outline: boolean; selected: boolean; siblingAmmo: boolean }>`
    ${pointerCss}
    padding: 2px 10px;
    ${hoveringCss}

    border-radius: 4px;
    opacity: ${(props) => (props.outline ? 1 : 0.05)};
    ${(props) => props.inAnimal && inSelectedCss}
    ${(props) => props.selected && `${selectedCss} color:orange;`}
	
    ${(props) => props.siblingAmmo && siblingCss}
    ${transitionCss}
`

const Ammo = ({ pk, name }: AmmoData) => {
    const { hoverAnimal, hoverAmmo, setHoverAmmo } = useAmmoContext()
    const { animal, ammo, setAmmo } = useSettingsContext()

    let outline = false
    if (hoverAnimal) outline = animalAmmo[hoverAnimal].includes(pk)
    let inAnimal = animal ? animalAmmo[animal].includes(pk) : false
    let siblingAmmoHovered = hoverAmmo ? JSON.stringify(ammoAnimal[hoverAmmo]) === JSON.stringify(ammoAnimal[pk]) : false
    return (
        <AmmoEntry
            onMouseEnter={() => setHoverAmmo(pk)}
            onMouseLeave={() => setHoverAmmo(null)}
            onClick={() => setAmmo(ammo === pk ? null : pk)}
            outline={outline || !hoverAnimal}
            inAnimal={inAnimal}
            selected={ammo === pk}
            siblingAmmo={siblingAmmoHovered}
        >
            {name}
        </AmmoEntry>
    )
}

export default Ammo
