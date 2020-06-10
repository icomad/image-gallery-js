import Yogurt from "../yogurt";
import App from "./App";

const data: LoadingModalData = {
	showModal: false,
	text: ''
};

const template: Template<LoadingModalData> = (props) => props.showModal ? `
	<div class='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
		<div class='flex justify-center items-center flex-col h-full w-full'>
			<div class='text-red-800 font-bold text-xl mb-5'>${props.text}</div>
			<span class="text-red-800 text-5xl">
					<i class="fas fa-circle-notch fa-spin"></i>
				</span>
		</div>
	</div>
` : ``;

const LoadingModal = new Yogurt<LoadingModalData>({
	selector: '#loading-modal',
	data,
	template,
	attachTo: App
});

export default LoadingModal;