import styled from 'styled-components'
import { CommonGuide } from '../MissionItem/Guide'

const GuideBox = styled.div`
    max-width: 900px;
    height: 600px;
    font-size: 16px;
`
const Guide = () => (
    <GuideBox>
        <p>An easy way of seeing theHunter Classic's mappings between reserves, species, ammunition, plus other useful info.</p>
        <ul>
            <li>Hover over a reserve to see its animals. Click to hide other animals.</li>
            <li>
                Hover over an animal to see its scores (min - tax* - max), max weight, CSS (gm$), fur variations, reserves & permitted ammo. Other animals which
                have the same permitted ammo will be outlined. Click to highlight reserves & ammo. *A taxidermy-worthy score is subjective, those listed here
                are just suggestions. Tax whatever you like :)
            </li>
            <li>Hover over ammo to see its permitted species, and, ammo with the same permitted species. Click to highlight them.</li>
            <CommonGuide />
        </ul>
    </GuideBox>
)

export default Guide
