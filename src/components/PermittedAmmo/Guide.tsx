import styled from 'styled-components'

const GuideBox = styled.div`
    max-width: 900px;
    height: 600px;
    font-size: 19px;
`
const Guide = () => (
    <GuideBox>
        <p>An easy way of seeing theHunter Classic's mappings between reserves, species, ammunition, plus other useful info.</p>
        <ul>
            <li>Hover over a reserve to see its animals. Click to hide other animals.</li>
            <li>
                Hover over an animal to see its scores (min - tax* - max), max weight, CSS (gm$), fur variations, reserves & permitted ammo. Click to highlight
                reserves & ammo. *A taxidermy-worthy score is subjective, those listed here are just suggestions. Tax whatever you like :)
            </li>
            <li>Hover over ammo to see its permitted species, and, ammo with the same permitted species. Click to highlight them.</li>
            <li>
                Shoutout thanks to the following people for their help with keeping this tool alive whilst I had a job lmao:
                <ul>
                    <li>Zulgeteb (Discord: zulgeteb) </li>
                    <li>Aciel (Discord:acielgaming)</li>
                </ul>
            </li>
            <li>If you happen to find a mistake or have any feedback or suggestions let me know. My in-game name is Brutus969. Kak2R is my discord.</li>
        </ul>
    </GuideBox>
)

export default Guide
