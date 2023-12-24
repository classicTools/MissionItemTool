import AmmoTypeData from '../../data/PermittedAmmo/AmmoType.json'
import sortBy from 'sort-by'
import AmmoData from '../../data/PermittedAmmo/Ammo.json'
import styled from 'styled-components'
import { useAmmoContext } from '../../context/AmmoContext'
import { useSettingsContext } from '../../context/SettingsContext'
import { animalAmmo } from '../../data/MissionItem/Data'
import { transitionCss } from './Animal'
const AmmoBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 700px;
    gap: 10px;
    font-size: 14px;
`
const AmmoGroup = styled.div<{ narrow?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: ${({ narrow }) => (narrow ? '135px' : '160px')};
    white-space: nowrap;
`
const TypeHeader = styled.div`
    font-weight: bold;
    line-height: 30px;
    text-align: right;
`
const Ammo = styled.div<{ inAnimal: boolean; outline: boolean; selected: boolean }>`
    cursor: pointer;
    user-select: none;
    padding: 2px 10px;
    &:hover {
        outline: 3px solid white;
    }

    border-radius: 4px;
    opacity: ${(props) => (props.outline ? 1 : 0.05)};
    ${(props) => props.inAnimal && 'background-color: green;'}
    ${(props) => props.selected && 'outline:2px solid orange;'}
	
    ${transitionCss}
`
const replacements = [' Ammunition', ' Partition', ' Ballistic Tip', ' Shells', ' Sporting', ' Handgun', ' Arrows', ' Magnum', ' AccuBond']
const regex = new RegExp(replacements.join('|'), 'g')

let ammoDataSimple = AmmoData.map((am) => ({
    ...am,
    name: am.name.replace(regex, ''),
}))

const AmmoList = () => {
    const { hoverAnimal, setHoverAmmo } = useAmmoContext()
    const { animal, ammo, setAmmo } = useSettingsContext()

    return (
        <AmmoBox>
            {AmmoTypeData.sort(sortBy('order')).map((ammotype) => (
                <AmmoGroup narrow={[1, 2, 3].includes(ammotype.pk)}>
                    <TypeHeader>{ammotype.name}</TypeHeader>
                    {ammoDataSimple
                        .filter((ammo) => ammo.ammotype === ammotype.pk)
                        .sort(sortBy('name'))

                        .map((ammoData) => {
                            let outline = false
                            if (hoverAnimal) outline = animalAmmo[hoverAnimal].includes(ammoData.pk)

                            let inAnimal = animal ? animalAmmo[animal].includes(ammoData.pk) : false
                            return (
                                <Ammo
                                    onMouseEnter={() => setHoverAmmo(ammoData.pk)}
                                    onMouseLeave={() => setHoverAmmo(null)}
                                    onClick={() => setAmmo(ammo === ammoData.pk ? null : ammoData.pk)}
                                    outline={outline || !hoverAnimal}
                                    inAnimal={inAnimal}
                                    selected={ammo === ammoData.pk}
                                >
                                    {ammoData.name}
                                </Ammo>
                            )
                        })}
                </AmmoGroup>
            ))}
        </AmmoBox>
    )
}

export default AmmoList
