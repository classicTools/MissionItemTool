import styled from 'styled-components'
import { CustomColors, useSettingsContext } from '../../context/SettingsContext'
import MissionKeyItem, { RelativeDiv } from './MissionKeyItem'
import { useState } from 'react'
import { SketchPicker } from 'react-color'

const KeyHeader = styled.div`
    color: grey;
    margin-bottom: 5px;
    text-align: center;
`
export type MissionKeyItemType = {
    name: string
    color: string
    key: keyof CustomColors
}

const Container = styled.div`
    padding: 10px;
    width: 250px;
    background-color: lightgray;
    border-radius: 10px;
`
const StyledSketchPicker = styled(SketchPicker)`
    position: absolute;
    left: 0;
    top: 10px;
    background-color: white;
`
const MissionKey = () => {
    const [selectedKey, setSelectedKey] = useState<keyof CustomColors | null>(null)
    const { customColors, setCustomColors } = useSettingsContext()

    let keys: MissionKeyItemType[] = [
        { name: `Ready`, color: customColors.ready, key: 'ready' },
        { name: `Ready, blocked`, color: customColors.blocked, key: 'blocked' },
        { name: `Partly met needs`, color: customColors.partlyLocked, key: 'partlyLocked' },
        { name: `Needs items you don't start with`, color: `orange`, key: 'partlyLocked' },
    ]
    const handleMissionKeyItemClick = (key: keyof CustomColors) => setSelectedKey(selectedKey === key ? null : key)

    return (
        <Container>
            <KeyHeader>Mission Key</KeyHeader>
            {keys.map((info) => (
                <MissionKeyItem {...info} onClick={() => handleMissionKeyItemClick(info.key)} selected={info.key === selectedKey} />
            ))}
            {selectedKey && (
                <RelativeDiv>
                    <StyledSketchPicker
                        color={customColors[selectedKey]}
                        onChangeComplete={(colorChosen) => setCustomColors({ ...customColors, [selectedKey]: colorChosen.hex })}
                    />
                </RelativeDiv>
            )}
        </Container>
    )
}

export default MissionKey
