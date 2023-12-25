import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'

const AgendaButton = styled.button`
    position: absolute;
    bottom: 55px;
    right: 30px;
    width: 184px;
    z-index: 30;
`

const AgendaToggle = () => {
    const { toggleAgenda } = useBookmarkContext()
    return <AgendaButton onClick={toggleAgenda}>Agenda</AgendaButton>
}

export default AgendaToggle
