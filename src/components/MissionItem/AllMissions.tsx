import styled from 'styled-components'
import missionsData from '../../data/MissionItem/lookups/Mission.json'
import missionSetsData from '../../data/MissionItem/lookups/MissionSet.json'
import MissionSet, { MissionSetRow, SetHeader } from './MissionSet'
import sortBy from 'sort-by'
import { useState } from 'react'
import { useBookmarkContext } from '../../context/BookmarkContext'
import { StyledNavLink } from '../../GlobalStyle'

let theme = () => {}
const TopSection = styled.div`
    display: grid;
    grid-template-columns: 400px 200px 200px 200px;
    justify-items: center;
`
const Header = styled.div`
    font-weight: bold;
`
const Bookmarks = styled.div`
    position: relative;
    left: 200px;
    display: grid;
    grid-template-columns: 320px 150px;
    height: 50px;
    gap: 10px;
    align-items: center;
`
const ResetButton = styled.button``
const StyledNavLinky = styled(StyledNavLink)`
    color: black;
`
const AllMissions = () => {
    const [alphaOrder, setAlphaOrder] = useState<boolean>(false)
    const { bookmarks, resetBookmarks } = useBookmarkContext()

    const bookmarkTotal = missionsData.reduce((acc: number, cur) => {
        const bookmarkedMission = bookmarks[cur.mission_set]
        if (!bookmarkedMission || (cur.mission_set in bookmarks && cur.order < bookmarkedMission)) return (acc += cur.reward)
        return acc
    }, 0)
    return (
        <div>
            <MissionSetRow>
                <SetHeader bold>Mission Pack</SetHeader>
                <TopSection>
                    <Header> gm$ rewards per mission</Header>
                    <div>
                        <input id="sortByWiki" type="radio" name="sort" onChange={() => setAlphaOrder(false)} checked={!alphaOrder} />
                        <label htmlFor="sortByWiki">Wiki order</label>
                        <input id="sortByAlpha" type="radio" name="sort" onChange={() => setAlphaOrder(true)} checked={alphaOrder} />
                        <label htmlFor="sortByAlpha">A-Z</label>
                    </div>
                    <div>
                        <input id="themeLight" type="radio" name="theme" onChange={theme} />
                        <label htmlFor="themeLight">Light</label>
                        <input id="themeDark" type="radio" name="theme" onChange={theme} />
                        <label htmlFor="themeDark">Dark</label>
                    </div>
                    <div>
                        <StyledNavLinky to={'../PermittedAmmo'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                            Permitted Ammo Tool
                        </StyledNavLinky>
                    </div>
                </TopSection>
            </MissionSetRow>
            {missionSetsData //.map(ms=>({...ms, order:animalData.find(a=>a.name===ms.name)?.order??ms.order}))
                .sort(sortBy(alphaOrder ? 'name' : 'order'))
                .map((ms) => {
                    return <MissionSet missionSet={ms} key={ms.pk}></MissionSet>
                })}

            <Bookmarks>
                <span>Earnings based on bookmarks so far: {bookmarkTotal} gm$</span>
                <ResetButton onClick={resetBookmarks}>{Object.keys(bookmarks).length ? 'Clear' : 'Reset'} Bookmarks</ResetButton>
            </Bookmarks>
        </div>
    )
}

export default AllMissions
