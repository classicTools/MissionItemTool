import styled, { ThemeContext } from 'styled-components'
import missionSetData from '../../data/MissionItem/lookups/MissionSet.json'
import { Anchor, Button, Tooltip } from '../genericElements'
import { useMissionsContext } from '../../context/MissionContext'
import { useHover } from '../../hooks'
import { pointerCss } from '../../CommonStyles'
import sortBy from 'sort-by'
import { useSettingsContext } from '../../context/SettingsContext'
import ShowIcon from '../ShowIcon'
import { useContext } from 'react'

const UnhideAll = styled.div`
    width: 184px;
    z-index: 30;
    background-color: ${({ theme }) => theme.buttonColor};
    padding: 10px;
    border-radius: 5px;
    text-align: center;
`
const UnhideAllButton = styled(Button)`
    margin-top: 10px;
    width: 170px;
    padding: 10px 0px;
`
const HiddenSet = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    ${pointerCss}
    &:hover {
        color: darkorange;
        svg {
            fill: darkorange;
        }
    }
`
const Tip = styled(Tooltip)`
    top: 10px;
    width: 184px;
    left: -10px;
    max-height: 400px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    border: none;

    gap: 5px;
    overflow-y: auto;
`

const UnhideMissions = () => {
    const { hiddenMissionSets, unhideAllMissionSets, unhideMissionSet } = useMissionsContext()
    const { hover, hoverFunctions } = useHover()
    const theme = useContext(ThemeContext)
    const { alphaOrder } = useSettingsContext()
    let hiddenMissionSetsData = missionSetData.filter((ms) => hiddenMissionSets.includes(ms.pk)).sort(sortBy(alphaOrder ? 'name' : 'order'))
    if (!hiddenMissionSets.length) return <></>
    return (
        <UnhideAll {...hoverFunctions}>
            Hidden mission packs: {hiddenMissionSets.length}
            {hover && hiddenMissionSets.length > 0 && (
                <Anchor>
                    <Tip>
                        {hiddenMissionSetsData.map((m) => (
                            <HiddenSet onClick={() => unhideMissionSet(m.pk)} title="Show">
                                <ShowIcon height={17} fill={theme.fontColor} />
                                <span>{m.name}</span>
                            </HiddenSet>
                        ))}
                        <UnhideAllButton onClick={unhideAllMissionSets}>Unhide all</UnhideAllButton>
                    </Tip>
                </Anchor>
            )}
        </UnhideAll>
    )
}

export default UnhideMissions
