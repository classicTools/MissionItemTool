import { MissionItemData, RawItemData } from '../../types'
import itemsData from '../../data/MissionItem/lookups/Item.json'
import sortBy from 'sort-by'
import styled from 'styled-components'
import { useItemsContext } from '../../context/ItemContext'

interface MissionItemsProps {
    missionItems: MissionItemData[]
}

const ItemSpan = styled.span<{ got?: boolean }>`
    ${({ got }) => got && 'text-decoration: line-through'};
`
export interface MissionItemDataName extends MissionItemData {
    name?: string
}
type GroupNum = number
type GroupedItems = { [index: GroupNum]: MissionItemDataName[] }
const MissionItems = ({ missionItems }: MissionItemsProps) => {
    const { itemsBought } = useItemsContext()
    const itemsPlus = missionItems
        .sort(sortBy('group', 'name'))
        .map((mi) => ({ ...mi, name: itemsData.find((item: RawItemData) => item.pk === mi.item)?.name }))

    const absoluteNeeds = itemsPlus.filter((item) => item.group === null).sort(sortBy('name'))
    const itemNumberedORGroups = itemsPlus.reduce((acc: GroupedItems, current) => {
        if (current.group !== null && current.any) acc[current.group] = [...(acc[current.group] ?? []), current]
        return acc
    }, {})
    // axis deer mission 9
    const itemNumberedANDGroup = itemsPlus.reduce((acc: GroupedItems, current) => {
        if (current.group !== null && !current.any) acc[current.group] = [...(acc[current.group] ?? []), current]
        return acc
    }, {})
    return (
        <>
            Requires:
            <ul>
                {absoluteNeeds.map((item) => (
                    <li key={item.item}>
                        <ItemSpan got={itemsBought.includes(item.item)}>{item.name}</ItemSpan>
                    </li>
                ))}
                {Object.entries(itemNumberedORGroups).map(([key, value]) => (
                    <li key={key}>
                        {value.sort(sortBy('name')).map((mItem: MissionItemDataName, index) => {
                            return (
                                <span key={mItem.item}>
                                    <ItemSpan got={itemsBought.includes(mItem.item)}>{mItem.name}</ItemSpan>
                                    <br />
                                    {index + 1 < value.length && ' or '}
                                </span>
                            )
                        })}
                    </li>
                ))}
                {Object.keys(itemNumberedANDGroup).length > 0 && (
                    <li>
                        {Object.entries(itemNumberedANDGroup)
                            .sort(sortBy('name'))
                            .map(([key, value], groupIndex) =>
                                value.map((mi: MissionItemDataName, index) => {
                                    let group = value
                                    const lastGroupItem = groupIndex + 1 < Object.keys(itemNumberedANDGroup).length
                                    return (
                                        <span key={mi.item}>
                                            <ItemSpan got={itemsBought.includes(mi.item)}>{mi.name}</ItemSpan>
                                            {index + 1 < group.length && ' and '}
                                            {lastGroupItem && index === group.length - 1 && (
                                                <>
                                                    <br />
                                                    or{' '}
                                                </>
                                            )}
                                        </span>
                                    )
                                })
                            )}
                    </li>
                )}
            </ul>
        </>
    )
}

export default MissionItems
