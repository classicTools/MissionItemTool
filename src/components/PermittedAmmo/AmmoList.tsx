import AmmoTypeData from '../../data/PermittedAmmo/AmmoType.json'
import sortBy from 'sort-by'
import AmmoData from '../../data/PermittedAmmo/Ammo.json'
import styled from 'styled-components'
const AmmoBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 700px;
    width: fit-content;
    gap: 10px 50px;
    font-size: 14px;
`
const AmmoGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 165px;
    white-space: nowrap;
`
const TypeHeader = styled.div`
    font-weight: bold;
    line-height: 30px;
    text-align: right;
`
const Ammo = styled.div``
const AmmoList = () => {
    return (
        <AmmoBox>
            {AmmoTypeData.sort(sortBy('order')).map((ammotype) => (
                <AmmoGroup>
                    <TypeHeader>{ammotype.name}</TypeHeader>
                    {AmmoData.filter((ammo) => ammo.ammotype === ammotype.pk)
                        .sort(sortBy('name'))
                        .map((ammo) => (
                            <Ammo>
                                {ammo.name
                                    .replaceAll(' Ammunition', '')
                                    .replaceAll(' Partition', '')
                                    .replaceAll(' Ballistic Tip', '')
                                    .replaceAll(' Shells', '')
                                    .replaceAll(' Sporting', '')
                                    .replaceAll(' Handgun', '')}
                            </Ammo>
                        ))}
                </AmmoGroup>
            ))}
        </AmmoBox>
    )
}

export default AmmoList
