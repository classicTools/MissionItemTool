import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import itemData from '../../data/MissionItem/lookups/Item.json'
import Item, { itemRowCSS } from './Item'
import styled from 'styled-components'
import sortBy from 'sort-by'
import { ItemData, RawItemData } from '../../types'
import { useItemsContext } from '../../context/ItemContext'
import { calculateGain, useMissionsContext } from '../../context/MissionContext'
import { pointerCss } from '../../CommonStyles'
import { Button } from '../genericElements'

const HeaderCellCenter = styled.div`
    text-align: center;
`
const HeaderCellRight = styled.div`
    justify-self: end;
    width: 20px; //hack
`
const ItemListDiv = styled.div`
    max-height: calc(100vh - 160px);
    margin: 0 20px 0 0;
    padding: 0 20px 0 0;
    overflow-y: auto;
    overflow-x: hidden;
    ${pointerCss}
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
const ResetButton = styled(Button)`
    width: 150px;
`
const ItemList = () => {
    const { itemsBought, setItemsBought } = useItemsContext()
    const { missionDataState, essentialItems } = useMissionsContext()
    const filteredMissionItemData = missionItemData.filter((mi) => missionDataState.map((m) => m.pk).includes(mi.mission))
    const itemDataPlus: ItemData[] = itemData
        .sort(sortBy('name'))
        .map((i: RawItemData) => {
            let wouldGive = 0

            if (!itemsBought.includes(i.pk)) wouldGive = calculateGain(missionDataState, itemsBought, i.pk)

            return {
                ...i,
                wouldGive,
                missions: filteredMissionItemData.filter((mi) => mi.item === i.pk).length,
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
                <ResetButton onClick={() => setItemsBought(itemsBought.length > 0 ? [] : essentialItems)}>
                    {itemsBought.length > 0 ? 'Reset Items' : 'Select Essentials'}
                </ResetButton>
                <span>Total Cost:</span>
                <span>
                    <b>
                        {itemData
                            .filter((item) => itemsBought.includes(item.pk))
                            .reduce((acc, cur) => {
                                acc += cur.cost
                                return acc
                            }, 0)}
                    </b>{' '}
                    gm$
                </span>
            </ItemSummary>
        </>
    )
}

export default ItemList
