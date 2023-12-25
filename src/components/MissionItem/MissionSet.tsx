import styled from 'styled-components'
import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import { flexR, pointerCss } from '../../CommonStyles'
import { ItemId, MissionDataPlus, MissionSetData } from '../../types'
import Mission from './Mission'
import { useSettingsContext } from '../../context/SettingsContext'
import { useItemsContext } from '../../context/ItemContext'
import { missionSetMap, missionSetMissions } from '../../data/MissionItem/Data'
import { useMissionsContext } from '../../context/MissionContext'

export const MissionSetRow = styled.div`
    display: grid;
    grid-template-columns: 160px 500px;
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
const SetLabel = styled.label`
    text-align: right;
    ${pointerCss}
`

export const SetHeader = styled.div<{ bold?: boolean; inSelectedMap?: boolean }>`
    ${flexR}
    justify-content:flex-end;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    user-select: none;
    &:hover {
        color: DarkOrange;
    }
    ${({ bold }) => bold && 'font-weight:bold'}
    ${({ inSelectedMap, theme }) => inSelectedMap && `background-color:${theme.missionSetHighlight}`}
`

const MissionSet = ({ missionSet }: MissionSetProps) => {
    const { map } = useSettingsContext()
    const { missionDataState } = useMissionsContext()
    const { setItemsBought } = useItemsContext()
    const inSelectedMap: boolean = map ? missionSetMap[map].includes(missionSet.pk) : false

    const toggleMustHaves = (): void => {
        const mustHaves: ItemId[] = missionItemData
            .filter((mi) => !mi.any && mi.group === null && missionSetMissions[missionSet.pk].includes(mi.mission))
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
            <SetHeader inSelectedMap={inSelectedMap} onClick={toggleMustHaves} title="Click to toggle all required items">
                <SetLabel> {missionSet.name}</SetLabel>
                <SetPic src={missionSet.image_url} />
            </SetHeader>
            <MissionsContainer>
                {missionDataState
                    .filter((m) => m.mission_set === missionSet.pk)
                    .map((m: MissionDataPlus) => {
                        return <Mission mission={m} key={m.pk} />
                    })}
            </MissionsContainer>
        </MissionSetRow>
    )
}

export default MissionSet
