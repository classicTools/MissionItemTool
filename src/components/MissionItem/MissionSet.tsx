import styled, { ThemeContext } from 'styled-components'
import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import { flexR, pointerCss } from '../../CommonStyles'
import { ItemId, MissionDataPlus, MissionSetData } from '../../types'
import Mission from './Mission'
import { useSettingsContext } from '../../context/SettingsContext'
import { useItemsContext } from '../../context/ItemContext'
import { missionSetMap, missionSetMissions } from '../../data/MissionItem/Data'
import { useMissionsContext } from '../../context/MissionContext'
import HideIcon from '../HideIcon'
import { useContext } from 'react'
import { Anchor, Tooltip } from '../genericElements'
import { useHover } from '../../hooks'

export const MissionSetRow = styled.div`
    display: grid;
    grid-template-columns: 160px 500px;
    align-items: center;
    gap: 5px;
    height: 27px;
`

const MissionsContainer = styled.div`
    ${flexR}
    align-items: center;
    gap: 2px;
`
interface MissionSetProps {
    missionSet: MissionSetData
}

const SetPic = styled.img`
    height: 16px;
    max-width: 30px;
`
const SetLabel = styled.span`
    text-align: right;
    ${pointerCss}
`

export const SetHeader = styled.div<{ bold?: boolean; inSelectedMap?: boolean }>`
    ${flexR}
    justify-content:flex-end;
    align-items: center;
    height: 100%;
    gap: 5px;
    ${pointerCss}
    &:hover {
        color: DarkOrange;
    }
    ${({ bold }) => bold && 'font-weight:bold'}
    ${({ inSelectedMap, theme }) => inSelectedMap && `background-color:${theme.missionSetHighlight}`}
`
const Tip = styled(Tooltip)`
    top: -20px;

    color: ${({ theme }) => theme.fontColor};
    white-space: nowrap;
    display: flex;
    align-items: center;
`

const MissionSet = ({ missionSet: { pk, name, image_url } }: MissionSetProps) => {
    const { map } = useSettingsContext()
    const { missionDataState, hideMissionSet } = useMissionsContext()
    const { setItemsBought } = useItemsContext()
    const { hover, hoverFunctions } = useHover()
    const inSelectedMap: boolean = map ? missionSetMap[map].includes(pk) : false
    const theme = useContext(ThemeContext)
    const toggleMustHaves = (): void => {
        const mustHaves: ItemId[] = missionItemData
            .filter((mi) => !mi.any && mi.group === null && missionSetMissions[pk].includes(mi.mission))
            .map((mi) => mi.item)

        setItemsBought((itemsBought) => {
            const notAllBought = !mustHaves.every((m) => itemsBought.includes(m))
            if (notAllBought) {
                //add all
                itemsBought = [...itemsBought, ...mustHaves]
            } else {
                itemsBought = itemsBought.filter((itemB) => !mustHaves.includes(itemB))
            }
            return itemsBought
        })
    }

    return (
        <MissionSetRow>
            <SetHeader inSelectedMap={inSelectedMap} onClick={toggleMustHaves} {...hoverFunctions}>
                <SetLabel> {name}</SetLabel>
                <SetPic src={image_url} title={name} />

                {hover && (
                    <Anchor>
                        <Tip>
                            <HideIcon onClick={() => hideMissionSet(pk)} height={17} fill={theme.fontColor} color={theme.fontColor} />
                            <span>
                                Total: <b>{missionDataState.filter((m) => m.mission_set === pk).reduce((a, b) => a + b.reward, 0)}</b> gm$
                            </span>
                        </Tip>
                    </Anchor>
                )}
            </SetHeader>
            <MissionsContainer>
                {missionDataState
                    .filter((m) => m.mission_set === pk)
                    .map((m: MissionDataPlus) => {
                        return <Mission mission={m} key={m.pk} />
                    })}
            </MissionsContainer>
        </MissionSetRow>
    )
}

export default MissionSet
