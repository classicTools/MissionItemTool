import { SketchPicker } from 'react-color'
import styled from 'styled-components'
import { useSettingsContext } from '../../context/Settings'

const PartialTD = styled.td`
    color: ${'partlyLocked'};
`

const KeyHeader = styled.div`
    color: grey;
`
const NeedsSpan = styled.span`
    font-weight: bold;
`
const Key = () => {
    const {
        customColors: { partlyLocked },
    } = useSettingsContext()
    // style="float:right;margin-left:10px">
    return (
        <div>
            <KeyHeader>Mission Key</KeyHeader>
            <SketchPicker />
            {/* <tr>
                    <td class="keyReady">
                        <button
                            class="colorpicker"
                            data-jscolor="{
                    onInput: 'colorReady(this, \'--mission-ready\')',
                    value:'90EE90',
                    }"
                            data-cssvariable="--mission-ready"
                        ></button>
                        Ready
                    </td>
                </tr>
                <tr>
                    <td class="keyBlocked">
                        <button
                            class="colorpicker"
                            data-jscolor="{
                    onInput: 'colorReady(this, \'--mission-blocked\')',
                    value:'008000',
                    }"
                            data-cssvariable="--mission-blocked"
                        ></button>
                        Ready, blocked
                    </td>
                </tr> */}
            <div>Partly met needs</div>
            <NeedsSpan>Needs items you don't start with</NeedsSpan>
        </div>
    )
}

export default Key
