import Yogurt from "../yogurt";
import App from "./App";
var state = {
    showModal: false,
    text: ''
};
var template = function (props) { return props.showModal ? "\n\t<div class='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>\n\t\t<div class='flex justify-center items-center flex-col h-full w-full'>\n\t\t\t<div class='text-red-800 font-bold text-xl mb-5'>" + props.text + "</div>\n\t\t\t<span class=\"text-red-800 text-5xl\">\n\t\t\t\t\t<i class=\"fas fa-circle-notch fa-spin\"></i>\n\t\t\t\t</span>\n\t\t</div>\n\t</div>\n" : ""; };
var LoadingModal = new Yogurt({
    selector: '#loading-modal',
    state: state,
    template: template,
    childOf: App
});
export default LoadingModal;
