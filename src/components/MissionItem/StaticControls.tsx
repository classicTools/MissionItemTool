import styled from 'styled-components'
import GreenKofi from '../Donate'

const StaticBit = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`

const StaticControls = () => {
    return (
        <StaticBit>
            <GreenKofi />
        </StaticBit>
    )
}

export default StaticControls
