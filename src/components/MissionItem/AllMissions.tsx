import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import missionsData from '../../data/MissionItem/Mission.json'
import missionSetsData from '../../data/MissionItem/MissionSet.json'
import MissionSet, { MissionSetRow, SetHeader } from './MissionSet'
import sortBy from 'sort-by'
import missionItemData from '../../data/MissionItem/MissionItem.json'
import { useState } from 'react'
import { MissionId, ItemId } from '../../types'
import { useItemsContext } from '../../context/Items'
import WithMissionsContext from '../../context/Mission'

let theme = () => {}
const TopSection = styled.div`
    display: grid;
    grid-template-columns: 400px 200px 200px 200px;
    justify-items: center;
`
const Header = styled.div`
    font-weight: bold;
`

const AllMissions = () => {
    const [alphaOrder, setAlphaOrder] = useState<boolean>(false)
    const { itemsBought } = useItemsContext()
    return (
        <div>
            <MissionSetRow>
                <SetHeader bold>Mission Pack</SetHeader>
                <TopSection>
                    <Header> gm$ rewards per mission</Header>
                    <div>
                        <input
                            id="sortByWiki"
                            type="radio"
                            name="sort"
                            onClick={() => setAlphaOrder(false)}
                            checked={!alphaOrder}
                        />
                        <label htmlFor="sortByWiki">Wiki order</label>
                        <input
                            id="sortByAlpha"
                            type="radio"
                            name="sort"
                            onClick={() => setAlphaOrder(true)}
                            checked={alphaOrder}
                        />
                        <label htmlFor="sortByAlpha">A-Z</label>
                    </div>
                    <div>
                        <input id="themeLight" type="radio" name="theme" onClick={theme} />
                        <label htmlFor="themeLight">Light</label>
                        <input id="themeDark" type="radio" name="theme" onClick={theme} />
                        <label htmlFor="themeDark">Dark</label>
                    </div>
                    <div>
                        <NavLink to={'PermittedAmmo'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                            Permitted Ammo Tool
                        </NavLink>
                    </div>
                </TopSection>
            </MissionSetRow>
            {missionSetsData.sort(sortBy(alphaOrder ? 'name' : 'order')).map((ms) => {
                return <MissionSet missionSet={ms} key={ms.pk}></MissionSet>
            })}
        </div>
    )
}

export default AllMissions