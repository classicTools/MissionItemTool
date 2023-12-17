import missionsData from '../../data/MissionItem/lookups/Mission.json'
import missionItemData from '../../data/MissionItem/MissionItem.json'
import itemData from '../../data/MissionItem/lookups/Item.json'
import Item, { itemRowCSS } from './Item'
import styled from 'styled-components'
import sortBy from 'sort-by'
import { ItemData, ItemId, MissionState, RawItemData } from '../../types'
import { useItemsContext } from '../../context/ItemContext'
import { calculateGain, useMissionsContext } from '../../context/MissionContext'

export const essentialItems: ItemId[] = missionItemData
    .filter((mi) => mi.any === false && mi.group === null)
    .reduce((acc: ItemId[], cur) => {
        if (!acc.includes(cur.item)) acc.push(cur.item)
        return acc
    }, [])

const HeaderCellCenter = styled.div`
    text-align: center;
`
const HeaderCellRight = styled.div`
    text-align: right;
`
const ItemListDiv = styled.div`
    max-height: calc(100vh - 160px);
    //position:static;
    margin: 0 20px 0 0;
    padding: 0 20px 0 0;
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
    cursor: pointer;
`
const HeaderItemRow = styled.div`
    ${itemRowCSS}

    font-weight: bold;
`
const ItemSummary = styled.div`
    display: grid;
    grid-template-columns: 200px 100px 100px;
    align-items: center;
    justify-items: center;
    margin: 8px 0 10px;
`
const ItemList = () => {
    const { itemsBought, setItemsBought } = useItemsContext()
    const { missionDataState } = useMissionsContext()

    const itemDataPlus: ItemData[] = itemData
        .sort(sortBy('name'))
        .map((i: RawItemData) => {
            let wouldGive = 0

            if (!itemsBought.includes(i.pk)) wouldGive = calculateGain(missionDataState, itemsBought, i.pk)

            return {
                ...i,
                wouldGive,
                missions: missionItemData.filter((mi) => mi.item === i.pk).length,
            }
        })
        .filter((i) => i.missions > 0)
    return (
        <>
            <ItemListDiv>
                <HeaderItemRow>
                    <HeaderCellCenter>Item</HeaderCellCenter>
                    <HeaderCellCenter>Uses</HeaderCellCenter>
                    <HeaderCellRight>Cost</HeaderCellRight>
                    <HeaderCellRight>Earns</HeaderCellRight>
                </HeaderItemRow>
                {itemDataPlus.map((i: ItemData) => (
                    <Item item={i} key={i.pk} />
                ))}
            </ItemListDiv>
            <ItemSummary>
                <button id="clearItems" onClick={() => setItemsBought(itemsBought.length > 0 ? [] : essentialItems)}>
                    {itemsBought.length > 0 ? 'Reset Items' : 'Select Essentials'}
                </button>
                <label>Total Cost:</label>
                <span>
                    <span id="itemtotal">
                        {itemData
                            .filter((item) => itemsBought.includes(item.pk))
                            .reduce((acc, cur) => {
                                acc += cur.cost
                                return acc
                            }, 0)}
                    </span>{' '}
                    gm$
                </span>
            </ItemSummary>
        </>
    )
}

export default ItemList
