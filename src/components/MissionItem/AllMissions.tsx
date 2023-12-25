import styled from 'styled-components'
import missionsData from '../../data/MissionItem/lookups/Mission.json'
import missionSetsData from '../../data/MissionItem/lookups/MissionSet.json'
import MissionSet, { MissionSetRow, SetHeader } from './MissionSet'
import sortBy from 'sort-by'
import { useBookmarkContext } from '../../context/BookmarkContext'
import { StyledNavLink } from '../../GlobalStyle'
import { useSettingsContext } from '../../context/SettingsContext'
import { Button } from '../genericElements'

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
const ResetButton = styled(Button)``
const StyledNavLinky = styled(StyledNavLink)`
    color: ${({ theme }) => theme.fontColor};
`
const AllMissions = () => {
    const { alphaOrder, setAlphaOrder, darkMode, toggleDarkMode } = useSettingsContext()
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
                        <label>
                            <input type="checkbox" checked={darkMode} onClick={toggleDarkMode} />
                            Dark Mode
                        </label>
                    </div>
                    <div>
                        <StyledNavLinky to={'./Ammo'} className={({ isActive }) => (isActive ? 'isActive' : '')}>
                            Permitted Ammo
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
                <span>
                    Earnings so far, based on bookmarks: <b>{bookmarkTotal}</b> gm$
                </span>
                <ResetButton onClick={resetBookmarks}>{Object.keys(bookmarks).length ? 'Clear' : 'Reset'} Bookmarks</ResetButton>
            </Bookmarks>
        </div>
    )
}

export default AllMissions
