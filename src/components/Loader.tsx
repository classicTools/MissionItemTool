import styled from 'styled-components'

const L = styled.div`
    height: 35px;
    width: 35px;
    border-top: 15px solid orange;
    border-right: 15px solid orange;
    border-radius: 50%;

    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const Loader = () => {
    return <L />
}

export default Loader
