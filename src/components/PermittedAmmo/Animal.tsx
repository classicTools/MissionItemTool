import styled, { css } from 'styled-components'
import { AnimalData, AssetFolder } from '../../types'
import { useHover, useImage } from '../../hooks'
import { Anchor, Tooltip } from '../genericElements'
import { useAmmoContext } from '../../context/AmmoContext'
import { ammoAnimal, mapAnimal } from '../../data/MissionItem/Data'
import { useSettingsContext } from '../../context/SettingsContext'

const AvatarBox = styled(Anchor)``
const outlineCSS = css`
    outline: 4px solid white;
`
export const transitionCss = css`
    transition: opacity 200ms, background-color 200ms, outline 200ms, filter 200ms;
`

const Avatar = styled.img<{ outline?: boolean; inMap: boolean; inAmmo: boolean; selected: boolean }>`
    height: 75px;
    cursor: pointer;
    user-select: none;
    &:hover {
        filter: brightness(1.5);
        ${outlineCSS}
    }
    padding: 7px;
    border-radius: 10px 20px;

    outline: ${({ outline }) => (outline ? '4px solid orange' : 'none')};
    ${({ inMap }) => inMap && 'opacity: 0.02;'}
    ${({ inAmmo }) => inAmmo && 'background-color: green;'}
    ${({ selected }) => selected && 'outline: 4px solid orange;'}
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
    font-size: larger;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const Animal = ({ pk, name, order, image_url, score_min, score_max, weight_max, rares, other_furs, tax, css_max }: AnimalData) => {
    const { hoverAmmo, hoverAnimal, hoverMap, setHoverAnimal } = useAmmoContext()
    const { map, animal, setAnimal, ammo } = useSettingsContext()
    const image = useImage(AssetFolder.Avatars, name)

    let outlineMap = hoverMap ? mapAnimal[hoverMap].includes(pk) : false
    let outlineAmmo = hoverAmmo ? ammoAnimal[hoverAmmo].includes(pk) : false

    let inAmmo = ammo ? ammoAnimal[ammo].includes(pk) : false
    let inMap = map ? !mapAnimal[map].includes(pk) : false
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
