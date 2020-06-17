import Yogurt from '../yogurt';

const state: ErrorState = {
	message: ''
}

const template: Template<ErrorState> = (props) => `
	<div class="w-full md:w-1/2" role="alert" >
		<div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">
			<span class="flex-grow font-bold">ERROR!</span>
			<button id='error-alert-delete' class="alert-delete transition-default hover:text-red-800"><i class="fas fa-times pointer-events-none"></i></button>
		</div>
		<div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
			<p id="error-body">${props.message}</p>
		</div>
	</div>
` 

const ErrorAlert = new Yogurt<ErrorState>({
	selector: '#error-alert',
	state,
	template,
})

export default ErrorAlert;