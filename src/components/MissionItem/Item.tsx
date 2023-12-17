import styled, { css } from 'styled-components'
import { profitColor } from '../../CommonStyles'
import { useItemsContext } from '../../context/Items'
import { useItemHoverContext } from '../../context/ItemHover'
import { useSettingsContext } from '../../context/Settings'
import { ItemData } from '../../types'
import { essentialItems } from './ItemList'
import { getStatesAndTotals, useMissionsContext } from '../../context/Mission'

export const itemRowCSS = css`
    display: grid;
    height: 23px;
    align-content: center;
    grid-template-columns: 220px 30px 70px 60px;
`

export const ItemRowDiv = styled.div<{ hovered?: boolean; bought?: boolean }>`
    ${itemRowCSS}
    width:400px;
    &:hover {
        outline: 1px solid black;
    }
    ${({ bought }) =>
        bought &&
        css`
            background-color: orange;
            //color: black;
        `};
`

const IntCell = styled.div`
    text-align: right;
`

const ProfitCell = styled(IntCell)<{ flash: boolean }>`
    color: ${profitColor};

    @keyframes flash {
        0%,
        50%,
        100% {
            opacity: 1;
        }
        25%,
        75% {
            opacity: 0;
        }
    }

    animation: ${({ flash }) => (flash ? 'flash 3s linear 0s infinite' : 'none')};
`

export const NameCell = styled.div`
    white-space: nowrap;
    overflow: hidden;
`
function toggleArrayItem(arr: number[], val: number) {
    const i = arr.indexOf(val)
    if (i === -1) arr.push(val)
    else arr.splice(i, 1)
    return arr
}

interface ItemProps {
    item: ItemData
}
const Item = ({ item }: ItemProps) => {
    const { itemsBought, setItemsBought } = useItemsContext()
    const { itemHovered, setItemHovered } = useItemHoverContext()
    const bought: boolean = itemsBought.includes(item.pk)
    return (
        <ItemRowDiv
            onMouseEnter={() => setItemHovered(item.pk)}
            hovered={itemHovered === item.pk}
            onClick={() =>
                setItemsBought((items: number[]) => {
                    let newitems = [...items]
                    return [...toggleArrayItem(newitems, item.pk)]
                })
            }
            bought={bought}
        >
            <NameCell title={item.name}>
                {!essentialItems.includes(item.pk) && '* '}
                {item.name}
            </NameCell>
            <IntCell>{item.missions}</IntCell>
            <IntCell>{item.cost}</IntCell>
            <ProfitCell flash={item.wouldGive > item.cost}>{item.wouldGive}</ProfitCell>
        </ItemRowDiv>
    )
}

export default Item
