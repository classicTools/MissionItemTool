import styled from 'styled-components'
import { MissionKeyItemType } from './MissionKey'
import { pointerCss } from '../../CommonStyles'

const KeyItemContainer = styled.div<{ selected: boolean }>`
    display: flex;
    align-items: center;
    ${pointerCss}
    font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`

const ColorThumb = styled.div`
    height: 20px;
    width: 100%;
    display: inline-block;
    padding: 1px 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`
interface MissionKeyItemProps extends MissionKeyItemType {
    onClick: () => void
    selected: boolean
}
const MissionKeyItem = ({ name, color, onClick, selected }: MissionKeyItemProps) => {
    return (
        <KeyItemContainer onClick={onClick} selected={selected} title="Click to change colour">
            <ColorThumb style={{ backgroundColor: color }}>{name}</ColorThumb>
        </KeyItemContainer>
    )
}

export default MissionKeyItem
