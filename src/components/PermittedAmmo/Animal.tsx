import styled, { css } from 'styled-components'
import { AnimalData, AssetFolder } from '../../types'
import { useImage } from '../../hooks'
import { Anchor, Tooltip } from '../genericElements'
import { useAmmoContext } from '../../context/AmmoContext'
import { ammoAnimal, animalAmmo, mapAnimal } from '../../data/MissionItem/Data'
import { useSettingsContext } from '../../context/SettingsContext'
import { pointerCss } from '../../CommonStyles'

const AvatarBox = styled(Anchor)``

export const siblingCss = css`
    outline: 2px inset gold;
`
export const hoveringCss = css`
    &:hover {
        filter: brightness(1.3);
        outline: 4px solid white;
    }
`
export const selectedCss = css`
    outline: 3px solid orange;
`
export const inSelectedCss = css`
    background-color: green;
`
export const transitionCss = css`
    transition: opacity 200ms, background-color 200ms, outline 200ms, filter 200ms;
`

const Avatar = styled.img<{ outline?: boolean; inMap: boolean; inAmmo: boolean; selected: boolean; siblingAnimal: boolean }>`
    height: 75px;
    ${pointerCss}
    ${hoveringCss}
    
    padding: 7px;
    border-radius: 10px 20px;

    ${({ outline }) => outline && selectedCss}
    ${({ inMap }) => inMap && 'opacity: 0.02;'}
    ${({ inAmmo }) => inAmmo && inSelectedCss}
    ${({ selected }) => selected && selectedCss}
    
    ${(props) => props.siblingAnimal && siblingCss}
    ${transitionCss}
`

const Value = styled.span`
    font-weight: bold;
`
const Tip = styled(Tooltip)`
    white-space: nowrap;
    width: fit-content;
    //max-width: 300px;
    padding: 0 15px 15px;
    font-size: 15px;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 5px;
    h4 {
        line-height: 7px;
    }
    background-color: lightyellow;
`
const Animal = ({ pk, name, order, image_url, score_min, score_max, weight_max, rares, other_furs, tax, css_max }: AnimalData) => {
    const { hoverAmmo, hoverAnimal, hoverMap, setHoverAnimal } = useAmmoContext()
    const { map, animal, setAnimal, ammo } = useSettingsContext()
    const image = useImage(AssetFolder.Avatars, name)

    let outlineMap = hoverMap ? mapAnimal[hoverMap].includes(pk) : false
    let outlineAmmo = hoverAmmo ? ammoAnimal[hoverAmmo].includes(pk) : false
    let inAmmo = ammo ? ammoAnimal[ammo].includes(pk) : false
    let inMap = map ? !mapAnimal[map].includes(pk) : false
    let siblingAnimalHovered = hoverAnimal ? JSON.stringify(animalAmmo[hoverAnimal]) === JSON.stringify(animalAmmo[pk]) : false
    return (
        <AvatarBox key={pk}>
            <Avatar
                src={image}
                onMouseEnter={() => setHoverAnimal(pk)}
                onMouseLeave={() => setHoverAnimal(null)}
                onClick={() => setAnimal(animal === pk ? null : pk)}
                outline={outlineMap || outlineAmmo}
                inMap={inMap}
                inAmmo={inAmmo}
                selected={animal === pk}
                siblingAnimal={siblingAnimalHovered}
            />
            {hoverAnimal === pk && (
                <Tip>
                    <h4>{name}</h4>
                    {rares && <div>Rares - {rares}</div>}
                    {other_furs && <div>Other furs - {other_furs}</div>}
                    <div>
                        Scores - {score_min} -<Value> {tax} </Value>- {score_max}
                    </div>
                    <div>
                        Max Weight - <Value>{weight_max}kg</Value>
                    </div>
                    <div>Max CSS - {css_max}gm$</div>
                </Tip>
            )}
        </AvatarBox>
    )
}

export default Animal
