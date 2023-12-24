import styled from 'styled-components'
import AnimalsData from '../../data/PermittedAmmo/Animal.json'
import { AnimalData } from '../../types'
import Animal from './Animal'
import sortBy from 'sort-by'

const AnimalList = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 100px);
    grid-gap: 10px;
`
const AnimalGrid = () => {
    return (
        <AnimalList>
            {AnimalsData.sort(sortBy('order')).map((data: AnimalData) => (
                <Animal {...data} key={data.pk} />
            ))}
        </AnimalList>
    )
}

export default AnimalGrid
