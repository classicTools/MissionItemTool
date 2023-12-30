import missionItemData from '../../data/MissionItem/mappings/MissionItem.json'
import { MissionItemData, AssetFolder, MissionDataPlus } from '../../types'
import styled from 'styled-components'
import MissionItems from './MissionItems'
import { getMissionImage, useImage } from '../../hooks'

const Info = styled.div`
    min-width: 500px;
`
export const HintImage = styled.img<{ show: boolean }>`
    max-width: 90vw;
    max-height: 90vh;
    margin: auto;
    padding: 10px;
    border-radius: 25px;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    transition: all 0.5s ease;
`
const MissionHintImage = styled(HintImage)`
    max-width: 500px;
    max-height: 750px;
`
interface MissionInfo {
    mission: MissionDataPlus
    showImage?: boolean
}

const MissionInfo = ({ mission, showImage }: MissionInfo) => {
    const { pk, objectives, order, name } = mission
    const image = useImage(AssetFolder.Missions, getMissionImage(mission))
    const missionItems: MissionItemData[] = missionItemData.filter((mi) => mi.mission === pk)
    const requiresItems = missionItems.length > 0

    return (
        <>
            <Info>
                <span>
                    {order} - {name}
                </span>
                <div dangerouslySetInnerHTML={{ __html: objectives }}></div>
                {requiresItems && <MissionItems missionItems={missionItems} />}
            </Info>
            {showImage && image && <MissionHintImage src={image} show></MissionHintImage>}
        </>
    )
}

export default MissionInfo
