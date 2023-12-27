import AmmoTypeData from '../../data/PermittedAmmo/AmmoType.json'
import sortBy from 'sort-by'
import AmmoData from '../../data/PermittedAmmo/Ammo.json'
import styled from 'styled-components'
import Ammo from './Ammo'
import { useSettingsContext } from '../../context/SettingsContext'
import { Button } from '../genericElements'
const AmmoBox = styled.div`
    width: 450px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 630px;
    gap: 10px;
    font-size: 14px;
`
const AmmoGroup = styled.div<{ narrow?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: ${({ narrow }) => (narrow ? '135px' : '175px')};
    white-space: nowrap;
`
const TypeHeader = styled.div`
    font-weight: bold;
    line-height: 30px;
    text-align: right;
`
const ClearButton = styled(Button)`
    margin-top: auto;
`

const declutteredAmmo = () => {
    const replacements = [' Ammunition', ' Partition', ' Ballistic Tip', ' Shells', ' Sporting', ' Handgun', ' Magnum', ' AccuBond']
    const regex = new RegExp(replacements.join('|'), 'g')
    return AmmoData.map((am) => ({
        ...am,
        name: am.name.replace(regex, ''),
    }))
}

const AmmoList = () => {
    const { resetAmmo } = useSettingsContext()
    return (
        <AmmoBox>
            {AmmoTypeData.sort(sortBy('order')).map((ammotype) => (
                <AmmoGroup narrow={[1, 2, 3].includes(ammotype.pk)} key={ammotype.pk}>
                    <TypeHeader>{ammotype.name}</TypeHeader>
                    {declutteredAmmo()
                        .filter((ammo) => ammo.ammotype === ammotype.pk)
                        .sort(sortBy('name'))
                        .map((ammoData) => (
                            <Ammo {...ammoData} key={ammoData.pk} />
                        ))}
                </AmmoGroup>
            ))}
            <ClearButton onClick={resetAmmo}>Clear Ammo Selection</ClearButton>
        </AmmoBox>
    )
}

export default AmmoList
