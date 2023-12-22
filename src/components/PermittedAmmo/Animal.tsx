import styled from 'styled-components'
import { AnimalData, AssetFolder } from '../../types'
import { useHover, useImage } from '../../hooks'
import { useState } from 'react'
import { Anchor, Tooltip } from '../genericElements'
import { useAmmoContext } from '../../context/AmmoContext'

const AvatarBox = styled(Anchor)``
const Avatar = styled.img`
    height: 75px;
    cursor: pointer;
    &:hover {
        filter: brightness(1.2);
    }
`

const Value = styled.span`
    font-weight: bold;
`
const Tip = styled(Tooltip)`
    width: 200px;
    padding: 0 15px 15px;
    font-size: larger;
`
const Animal = ({ pk, name, order, image_url, score_min, score_max, weight_max, rares, other_furs, tax, css_max }: AnimalData) => {
    const { hoverId, hoverType, updateHover } = useAmmoContext()
    const image = useImage(AssetFolder.Avatars, name)
    return (
        <AvatarBox key={pk}>
            <Avatar src={image} onMouseEnter={() => updateHover(pk, 'animal')} onMouseLeave={() => updateHover(null, null)} />
            {hoverId === pk && (
                <Tip>
                    <h3>{name}</h3>
                    {rares && (
                        <div>
                            Rares - <Value>{rares}</Value>
                        </div>
                    )}
                    {other_furs && (
                        <div>
                            Other furs - <Value>{other_furs}</Value>
                        </div>
                    )}
                    <div>
                        Scores -{' '}
                        <Value>
                            {score_min} - {tax} - {score_max}
                        </Value>
                    </div>
                    <div>
                        Max Weight - <Value>{weight_max}</Value> kg
                    </div>
                    <div>
                        Max CSS - <Value>{css_max}</Value> gm$
                    </div>
                </Tip>
            )}
        </AvatarBox>
    )
}

export default Animal
