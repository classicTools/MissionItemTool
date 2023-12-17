import styled from 'styled-components'
import { useBookmarkContext } from '../../context/BookmarkContext'

const AgendaButton = styled.button`
    position: absolute;
    bottom: 70px;
    right: 30px;
    width: 184px;
`

const AgendaToggle = () => {
    const { toggleAgenda } = useBookmarkContext()
    return <AgendaButton onClick={toggleAgenda}>Agenda</AgendaButton>
}

export default AgendaToggle
