import styled from 'styled-components'
import { profitColor } from '../../StyleVars'
import { ItemData } from '../../types'

export const ItemRowDiv = styled.div<{ isHeader?: boolean }>`
    display: grid;
    grid-template-columns: 220px 30px 70px 60px;
    //width:400px;
    &:hover {
        ${(props) => !props.isHeader && 'outline:1px dashed black'};
    }
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

    animation: ${(props) => (props.flash ? 'flash 3s linear 0s infinite' : 'none')};
`

export const NameCell = styled.div`
    white-space: nowrap;
    overflow: hidden;
`

interface ItemProps {
    item: ItemData
}
const Item = ({ item }: ItemProps) => {
    return (
        <ItemRowDiv>
            <NameCell title={item.name}>{item.name}</NameCell>
            <IntCell>{item.missions}</IntCell>
            <IntCell>{item.cost}</IntCell>
            <ProfitCell flash={item.wouldGive > item.cost}>{item.wouldGive}</ProfitCell>
        </ItemRowDiv>
    )
}

export default Item
