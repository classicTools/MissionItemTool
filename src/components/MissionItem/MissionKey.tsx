import styled from 'styled-components'
import { CustomColors, useSettingsContext } from '../../context/SettingsContext'
import MissionKeyItem from './MissionKeyItem'

const KeyHeader = styled.div`
    color: grey;
    margin-bottom: 5px;
`
export type MissionKeyItemType = {
    name: string
    color: string
    key: keyof CustomColors
}

const Container = styled.div`
    padding: 10px;
    width: 240px;
    background-color: lightgray;
    border-radius: 10px;
`

const MissionKey = () => {
    const { customColors } = useSettingsContext()
    let keys: MissionKeyItemType[] = [
        { name: `Ready`, color: customColors.ready, key: 'ready' },
        { name: `Ready, blocked`, color: customColors.blocked, key: 'blocked' },
        { name: `Partly met needs`, color: customColors.partlyLocked, key: 'partlyLocked' },
        { name: `Needs items you don't start with`, color: `orange`, key: 'partlyLocked' },
    ]

    return (
        <Container>
            <KeyHeader>Mission Key</KeyHeader>
            {keys.map((info) => (
                <MissionKeyItem {...info} />
            ))}
        </Container>
    )
}

export default MissionKey
