import Yogurt from "../yogurt";
import App from "./App";

const state: LoadingModalState = {
	showModal: false,
	text: ''
};

const template: Template<LoadingModalState> = (props) => props.showModal ? `
	<div class='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
		<div class='flex justify-center items-center flex-col h-full w-full'>
			<div class='text-red-800 font-bold text-xl mb-5'>${props.text}</div>
			<span class="text-red-800 text-5xl">
					<i class="fas fa-circle-notch fa-spin"></i>
				</span>
		</div>
	</div>
` : ``;

const LoadingModal = new Yogurt<LoadingModalState>({
	selector: '#loading-modal',
	state,
	template,
	childOf: App
});

export default LoadingModal;