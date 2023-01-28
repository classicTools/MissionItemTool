import { MissionItemData, RawItemData } from '../../types'
import itemsData from '../../data/MissionItem/Item.json'
import sortBy from 'sort-by'
import styled from 'styled-components'

interface MissionItemsProps {
    missionItems: MissionItemData[]
}

const ItemSpan = styled.span<{ got?: boolean }>`
    ${(props) => props.got && 'text-decoration: line-through'};
`

const MissionItems = ({ missionItems }: MissionItemsProps) => {
    const itemsPlus = missionItems
        .sort(sortBy('group', 'name'))
        .map((mi) => ({ ...mi, name: itemsData.find((item: RawItemData) => item.pk === mi.item)?.name }))

    const absoluteNeeds = itemsPlus.filter((item) => item.group === null).sort(sortBy('name'))
    const itemNumberedORGroups = itemsPlus.reduce((acc: any, current) => {
        if (current.group !== null && current.any) acc[current.group] = [...(acc[current.group] ?? []), current]
        return acc
    }, {})
    console.log(itemNumberedORGroups)
    const itemNumberedANDGroup = itemsPlus.reduce((acc: any, current) => {
        if (current.group !== null && !current.any) acc[current.group] = [...(acc[current.group] ?? []), current]
        return acc
    }, {})
    return (
        <>
            Requires:
            <ul>
                {absoluteNeeds.map((item) => (
                    <li>
                        <ItemSpan>{item.name}</ItemSpan>
                    </li>
                ))}
                {Object.keys(itemNumberedORGroups).map((key) => (
                    <li>
                        {itemNumberedORGroups[key].sort(sortBy('name')).map((item: any, index: number) => {
                            return (
                                <>
                                    <ItemSpan>{item.name}</ItemSpan>
                                    <br />
                                    {index + 1 < itemNumberedORGroups[key].length && ' or '}
                                </>
                            )
                        })}
                    </li>
                ))}
                {Object.keys(itemNumberedANDGroup).length > 0 && (
                    <li>
                        {Object.keys(itemNumberedANDGroup)
                            .sort(sortBy('name'))
                            .map((key, groupIndex) =>
                                itemNumberedANDGroup[key].map((item: any, index: number) => {
                                    let group = itemNumberedANDGroup[key]
                                    const lastGroupItem = groupIndex + 1 < Object.keys(itemNumberedANDGroup).length
                                    return (
                                        <>
                                            <ItemSpan>{item.name}</ItemSpan>
                                            {index + 1 < group.length && ' and '}
                                            {lastGroupItem && index === group.length - 1 && (
                                                <>
                                                    <br />
                                                    or{' '}
                                                </>
                                            )}
                                        </>
                                    )
                                })
                            )}
                    </li>
                )}
            </ul>
        </>
    )
}
// data-mi_item_id="{{i.item.id}}"
// data-any="{{i.any}}"
// data-group="{{i.group}}"

export default MissionItems
