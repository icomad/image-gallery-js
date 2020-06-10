import Yogurt from '../yogurt';

const data: SuccessData = {
	message: ''
}

const template: Template<SuccessData> = (props) => `
	<div class="w-full md:w-1/2" role="alert" >
		<div class="bg-green-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">
			<span class="flex-grow font-bold">SUCCESS!</span>
			<button id='error-alert-delete' class="alert-delete transition-default hover:text-green-800"><i class="fas fa-times pointer-events-none"></i></button>
		</div>
		<div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
			<p id="success-body">${props.message}</p>
		</div>
	</div>
` 

const SuccessAlert = new Yogurt<SuccessData>({
	selector: '#success-alert',
	data,
	template,
})

export default SuccessAlert;