import missionItemData from '../../data/MissionItem/MissionItem.json'
import itemData from '../../data/MissionItem/Item.json'
import Item, { ItemRowDiv } from './Item'
import styled from 'styled-components'
import sortBy from 'sort-by'
import { ItemData, RawItemData } from '../../types'

const HeaderCellCenter = styled.div`
    text-align: center;
    font-weight: bold;
`
const HeaderCellRight = styled.div`
    text-align: right;
    font-weight: bold;
`
const ItemListDiv = styled.div`
    max-height: calc(100vh - 145px);
    margin: 0 20px 0 0;
    padding: 0 20px 0 0;
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
`

const ItemList = () => {
    const itemDataPlus: ItemData[] = itemData
        .map((i: RawItemData) => ({
            ...i,
            wouldGive: 10000,
            missions: missionItemData.filter((mi) => mi.item === i.pk).length,
        }))
        .sort(sortBy('name'))
    return (
        <ItemListDiv>
            <ItemRowDiv isHeader>
                <HeaderCellCenter>Item</HeaderCellCenter>
                <HeaderCellCenter>Uses</HeaderCellCenter>
                <HeaderCellRight>Cost</HeaderCellRight>
                <HeaderCellRight>Earns</HeaderCellRight>
            </ItemRowDiv>
            {itemDataPlus.map((i: ItemData) => (
                <Item item={i} key={i.pk} />
            ))}
        </ItemListDiv>
    )
}

export default ItemList
