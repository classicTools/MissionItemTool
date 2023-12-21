import styled from 'styled-components'
import { MissionKeyItemType } from './MissionKey'

const KeyItemContainer = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`

export const RelativeDiv = styled.div`
    position: relative;
    width: 0;
    height: 0;
`
const ColorThumb = styled.div`
    height: 20px;
    width: 20px;
    display: inline-block;
    margin: 2px 4px;
`
interface MissionKeyItemProps extends MissionKeyItemType {
    onClick: () => void
    selected: boolean
}
const MissionKeyItem = ({ name, color, key, onClick, selected }: MissionKeyItemProps) => {
    return (
        <KeyItemContainer onClick={onClick} selected={selected}>
            <ColorThumb style={{ backgroundColor: color }} />
            {name}
        </KeyItemContainer>
    )
}

export default MissionKeyItem
