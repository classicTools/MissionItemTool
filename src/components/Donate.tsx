import styled from 'styled-components'

const KofiBox = styled.div`
    .btn-container {
        left: unset;
        right: 160px !important;
    }
`

const GreenKofi = () => {
    return (
        <KofiBox
            dangerouslySetInnerHTML={{
                __html: `<script type="text/javascript" src="https://storage.ko-fi.com/cdn/widget/Widget_2.js"></script>
		
				<script type="text/javascript">kofiwidget2.init('Support Me on Ko-fi', '#29abe0', 'D1D82FG9R');kofiwidget2.draw();</script>

		<script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>
		<script>
			{kofiWidgetOverlay.draw('kak2r_1793', {
				type: 'floating-chat',
				'floating-chat.donateButton.text': 'Support me',
				'floating-chat.donateButton.background-color': '#f45d22',
				'floating-chat.donateButton.text-color': '#fff',
			})}
		</script>
	`,
            }}
        ></KofiBox>
    )
}

export default GreenKofi
