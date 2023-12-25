import AmmoTypeData from '../../data/PermittedAmmo/AmmoType.json'
import sortBy from 'sort-by'
import AmmoData from '../../data/PermittedAmmo/Ammo.json'
import styled from 'styled-components'
import Ammo from './Ammo'
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
    width: ${({ narrow }) => (narrow ? '135px' : '175px')};
    white-space: nowrap;
`
const TypeHeader = styled.div`
    font-weight: bold;
    line-height: 30px;
    text-align: right;
`
const replacements = [' Ammunition', ' Partition', ' Ballistic Tip', ' Shells', ' Sporting', ' Handgun', ' Magnum', ' AccuBond']
const regex = new RegExp(replacements.join('|'), 'g')

let ammoDataSimple = AmmoData.map((am) => ({
    ...am,
    name: am.name.replace(regex, ''),
}))

const AmmoList = () => {
    return (
        <AmmoBox>
            {AmmoTypeData.sort(sortBy('order')).map((ammotype) => (
                <AmmoGroup narrow={[1, 2, 3].includes(ammotype.pk)} key={ammotype.pk}>
                    <TypeHeader>{ammotype.name}</TypeHeader>
                    {ammoDataSimple
                        .filter((ammo) => ammo.ammotype === ammotype.pk)
                        .sort(sortBy('name'))
                        .map((ammoData) => (
                            <Ammo {...ammoData} key={ammoData.pk} />
                        ))}
                </AmmoGroup>
            ))}
        </AmmoBox>
    )
}

export default AmmoList
