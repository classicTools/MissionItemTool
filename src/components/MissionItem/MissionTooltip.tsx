import { MissionDataPlus } from '../../types'
import styled, { css } from 'styled-components'
import { Anchor, Tooltip } from '../genericElements'
import { flexR } from '../../CommonStyles'
import MissionInfo from './MissionInfo'

const Tip = styled(Tooltip)<{ left: boolean }>`
    width: fit-content;
    text-align: left;

    padding-bottom: 0;
    ${flexR}

    ${({ left }) =>
        left
            ? css`
                  left: -165px;
              `
            : css`
                  left: -415px;
              `}
`

const MissionTooltip = ({ mission }: { mission: MissionDataPlus }) => {
    const { order } = mission
    return (
        <Anchor>
            <Tip left={order < 6}>
                <MissionInfo mission={mission} showImage />
            </Tip>
        </Anchor>
    )
}

export default MissionTooltip
