import styled, { css } from 'styled-components'
import { useItemsContext } from '../../context/ItemContext'
import { useItemHoverContext } from '../../context/ItemHover'
import { ItemData } from '../../types'
import { essentialItems } from './ItemList'

export const itemRowCSS = css`
    display: grid;
    height: 23px;
    align-content: center;
    grid-template-columns: 220px 30px 70px 60px;
`

export const ItemRow = styled.div<{ bought?: boolean }>`
    border-radius: 6px;
    padding-left: 10px;
    margin-bottom: 1px;
    margin-left: 2px;
    ${itemRowCSS}
    width:400px;
    &:hover {
        font-weight: bold;
    }

    ${({ bought, theme }) =>
        bought &&
        css`
            background-color: ${theme.boughtItemHighlight};
            //color: black;
        `};
`

const IntCell = styled.div`
    text-align: right;
`

const ProfitCell = styled(IntCell)<{ flash: boolean }>`
    color: ${({ theme }) => theme.profitColor};

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
interface ItemProps {
    item: ItemData
}
const Item = ({ item: { pk, name, missions, cost, wouldGive } }: ItemProps) => {
    const { itemsBought, toggleItemBought } = useItemsContext()
    const { itemHovered, setItemHovered } = useItemHoverContext()
    const bought = itemsBought.includes(pk)
    return (
        <ItemRow onMouseEnter={() => setItemHovered(pk)} onClick={() => toggleItemBought(pk)} bought={bought}>
            <NameCell title={name}>
                {!essentialItems.includes(pk) && '* '}
                {name}
            </NameCell>
            <IntCell>{missions}</IntCell>
            <IntCell>{cost}</IntCell>
            <ProfitCell flash={wouldGive > cost}>{wouldGive}</ProfitCell>
        </ItemRow>
    )
}

export default Item
