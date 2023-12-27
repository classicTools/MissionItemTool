import styled from 'styled-components'

export const Anchor = styled.div`
    position: relative;
`

export const Tooltip = styled.div`
    position: absolute;
    //background-color: lightyellow;
    background-color: ${({ theme }) => theme.tooltipColor};
    z-index: 100;
    border-radius: 8px;
    font-size: 13px;
    padding: 10px;
    border: solid 2px grey;
`
export const Button = styled.button`
    //font-weight: bold;
    border: none;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.buttonColor};
    color: ${({ theme }) => theme.fontColor};

    &:hover {
        filter: brightness(1.3);
    }
`
