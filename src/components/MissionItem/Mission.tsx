import missionItemData from '../../data/MissionItem/MissionItem.json'
import { MissionData, MissionState, MissionItemData } from '../../types'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import MissionItems from './MissionItems'

const MissionBox = styled.div`
    height: 25px;
    width: 50px;
    min-width: 50px;
    font-size: 13px;
    text-align: center;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    background-color: lightblue;
    display: grid;
`
const Reward = styled.div<{ requiresItems: boolean }>`
    height: 20px;
    width: 40px;
    min-width: 40px;
    font-weight: ${(props) => (props.requiresItems ? 'bold' : 'normal')};
    justify-self: center;
    align-self: end;
`

const TooltipAnchor = styled.div`
    position: relative;
    display: inline-block;
    min-width: 38px;
`

const Tooltip = styled.div<{ left: boolean; show: boolean }>`
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    width: 500px;
    background-color: lightyellow;
    color: black;
    text-align: left;
    border-radius: 6px;
    padding: 10px 10px 0 10px;

    /* Position the tooltip */
    position: absolute;
    z-index: 20;
    line-height: initial;

    top: 15px;
    ${(props) =>
        props.left
            ? css`
                  left: 15px;
              `
            : css`
                  right: 15px;
              `}
`

interface MissionProps {
    mission: MissionData
    state: MissionState
}
const Mission = ({ mission, state }: MissionProps) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false)
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === mission.pk)

    const requiresItems = missionItems.length > 0
    return (
        <MissionBox
            data-mission_id={mission.pk}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Reward requiresItems={requiresItems}>{mission.reward}</Reward>
            <TooltipAnchor>
                <Tooltip left={mission.order < 8} show={showTooltip}>
                    {mission.order} - {mission.name}
                    <div dangerouslySetInnerHTML={{ __html: mission.objectives }}></div>
                    {requiresItems && <MissionItems missionItems={missionItems} />}
                </Tooltip>
            </TooltipAnchor>
        </MissionBox>
    )
}

export default Mission
