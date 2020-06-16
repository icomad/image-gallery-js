import Yogurt from '../yogurt';

const data: IndexData = {
	showSuccess: false,
	showError: false,
	showIndex: true,
}

const template: Template<IndexData> = (props) => `
	<header id="index-navbar" class='header'></header>
	<main class="bg-gray-100 flex-grow">
		<div class="container mx-auto p-4">
			<section id='error-alert' class='mt-5 flex w-full justify-center items-center ${props.showError ? '' : 'hidden'}'></section>
			<section id='success-alert' class='mt-5 flex w-full justify-center items-center ${props.showSuccess ? '' : 'hidden'}'></section>
			<section id='index'>
				${props.showIndex ? `<div class="mt-12 w-full flex justify-center">
					<div class="text-3xl font-semibold text-gray-800">
						Project for the exam of Web Technologies
					</div>
				</div>
				<div class="mt-12 w-full flex justify-center">
					<div class="text-xl text-gray-800">
						Check the code here: <a class="text-blue-500 transition-default hover:text-blue-300" target="_blank" href="https://github.com/icomad/image-gallery-js">Github Repository</a>
					</div>
				</div>` : ``}
			</section>
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