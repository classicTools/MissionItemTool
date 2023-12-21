import { SketchPicker } from 'react-color'
import styled from 'styled-components'
import { useSettingsContext } from '../../context/SettingsContext'
import { MissionKeyItemType } from './MissionKey'
import { useState } from 'react'

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
const StyledSketchPicker = styled(SketchPicker)`
    position: absolute;
    left: 0;
    top: 10px;
    background-color: white;
`
const MissionKeyItem = ({ name, color, key }: MissionKeyItemType) => {
    const { customColors, setCustomColors } = useSettingsContext()
    const [showColorPicker, setShowColorPicker] = useState(false)
    const toggleColorPicker = () => setShowColorPicker(!showColorPicker)
    return (
        <KeyItemContainer onClick={toggleColorPicker} selected={showColorPicker}>
            <ColorThumb style={{ backgroundColor: color }} />
            {showColorPicker && (
                <RelativeDiv>
                    <StyledSketchPicker color={color} onChangeComplete={(colorChosen) => setCustomColors({ ...customColors, [key]: colorChosen.hex })} />
                </RelativeDiv>
            )}
            {name}
        </KeyItemContainer>
    )
}

export default MissionKeyItem
