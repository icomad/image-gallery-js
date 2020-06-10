import Yogurt from '../yogurt';

const data: IndexData = {
	showSuccess: false,
	showError: false
}

const template: Template<IndexData> = (props) => `
	<header id="index-navbar" class='header'></header>
	<main class="bg-gray-100 flex-grow">
		<div class="container mx-auto p-4">
			<section id='error-alert' class='mt-5 flex w-full justify-center items-center ${props.showError ? '' : 'hidden'}'></section>
			<section id='success-alert' class='mt-5 flex w-full justify-center items-center ${props.showSuccess ? '' : 'hidden'}'></section>
			<section id='signin-section'></section>
			<section id='signup-section'></section>
		</div>
	</main>
`

const Index = new Yogurt<IndexData>({
	selector: '#app',
	data,
	template
});

export default Index;