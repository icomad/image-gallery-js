import Yogurt from '../yogurt';

const state: AppState = {
	showError: false,
	showSuccess: false,
	showDashboard: true,
	showAlbum: false,
	showImage: false,
	currentAlbum: null,
	currentImage: null,
}

const template: Template<AppState> = (props) => `
	<div id='loading-modal'></div>
	<header id="app-navbar" class='header'></header>
	<main class="bg-gray-100 flex-grow">
		<div class="container mx-auto p-4">
			<section id='error-alert' class='mt-5 flex w-full justify-center items-center ${props.showError ? '' : 'hidden'}'></section>
			<section id='success-alert' class='mt-5 flex w-full justify-center items-center ${props.showSuccess ? '' : 'hidden'}'></section>
			<section id='dashboard-section' class="${props.showDashboard ? '' : 'hidden'}"></section>
			<section id='album-detail-section' class="${props.showAlbum ? '' : 'hidden'}"></section>
			<section id='image-detail-section' class="${props.showImage ? '' : 'hidden'}"></section>
		</div>
	</main>
`

const App = new Yogurt<AppState>({
	selector: '#app',
	state,
	template
});

export default App;