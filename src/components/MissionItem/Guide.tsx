import styled from 'styled-components'
import Loader from '../Loader'
import Key from './Key'
const syncBookmarks = () => 1
const GuideDiv = styled.div`
    max-width: 1000px;
    min-width: 815px;
`
const GuideUL = styled.ul`
    min-width: 500px;
`
const NotesUL = styled.ul`
    list-style-type: circle;
`
const Guide = () => {
    return (
        <GuideDiv>
            <div id="guide">
                <h4>Guide to Kak2R#1793's Mission Item Tool for theHunter Classic</h4>
                <Key />
                <GuideUL>
                    <li>
                        This tool presents mission information in a highly accessible way and help players maximise
                        their in-game currency earnings from missions by showing them the most profitable items to buy,
                        personalised according to what a player has already bought. In a nutshell, click on the items
                        that you have already purchased on the left and you'll be shown what you can earn from other
                        items. You can also easily keep track of the missions you are on by using the bookmarking
                        feature.
                    </li>
                    <li>
                        <p>
                            Synchronise your mission progress! Go to your
                            <a href="https://www.thehunter.com/#missions">Regular Missions Page</a> via launcher or
                            browser, don't click anywhere, press ctrl+A followed by ctrl+C to select & copy everything
                            on the page, then paste it into the textbox below, click the button and your mission
                            bookmarks here will be synchronised. Purchased items will be synchronised where possible.
                            NOTE: Only works in English!
                        </p>
                        <div id="divSyncBookmarks">
                            <textarea id="txtSyncBookmarks" placeholder="Paste mission page here"></textarea>
                            <button id="btnSyncBookmarks" onClick={syncBookmarks}>
                                Synchronise Bookmarks
                            </button>
                            <Loader />
                        </div>
                    </li>

                    <li>
                        Hover over an item on the left to show missions that must use it or can use it. "Uses" is the
                        number of those missions.
                    </li>
                    <li>
                        Click on an item to count it as 'purchased' and see what missions will be unlocked. The earnings
                        of unselected items will be recalculated every time.
                    </li>
                    <li>
                        "Earns" is the extra unlocked amount which you will currently be able to earn from having that
                        item, both from the accessible missions requiring it and from the missions after it which were
                        already ready. It flashes if the amount is greater than the cost of the item, and its value
                        depends on what other items you have already clicked. The amount does not include rewards from
                        later missions which also require the item but which are blocked by the unfulfilled requirements
                        of a previous mission. Those will be included in the earnings of future items. Remember that an
                        item purchased now might not help you complete any missions, but when purchased later after
                        other items, can open up many. This tool can be used to find an optimal 'purchasing pathway'.
                    </li>
                    <li>
                        Asterisked (*) items are non-essential - they <em>can</em> be used to complete some missions,
                        but it's possible to complete all missions without them.
                    </li>
                    <li>
                        Hover over the mission rewards to see objectives and required items. Click on a mission reward
                        to 'bookmark' that mission as the currently active mission in the mission pack.
                    </li>
                    <li>
                        Hover over a mission pack name to see its currently unlocked gm$. Click on it to select/deselect
                        all the items <em>absolutely</em> required for that pack. Requirements that state "either this
                        item or that" are left to you.
                    </li>
                    <li>Mainly for desktop use, but if you are viewing on a phone, tap and hold briefly to 'hover'.</li>
                </GuideUL>

                <NotesUL>
                    <li>
                        {' '}
                        This tool assumes that you already have the .243 rifle, 4x32mm scope, 12GA single shot shotgun &
                        ground blind.
                    </li>
                    <li>
                        {' '}
                        For Red Kangaroo mission 10 I have only specified scopes which all the Anschütz rifles can use.
                    </li>
                    <li>
                        {' '}
                        B&C Club mission 5 requires you use any scoped weapon for a moose. As there are many
                        possibilities here, I have not bothered accounting for it - so this tool assumes you will
                        already have something suitable by then. Highly probable. (The most inexpensive choices are the
                        .30-06 Stutzen, .300 or .340 Weatherby, the only moose permitted rifles that can take the 4x32mm
                        starting scope.)
                    </li>
                    <li>
                        If you happen to find a mistake or have any feedback or suggestions let me know. My in-game name
                        is Brutus969. Kak2R is my discord.
                    </li>
                    <li>
                        Most mission info comes from the <a href="https://thehunter.fandom.com/wiki/Missions">wiki</a>,
                        credit to HooCairs and any others for putting it there in the first place! Long live this great
                        game.
                    </li>
                </NotesUL>
            </div>
        </GuideDiv>
    )
}

export default Guide
