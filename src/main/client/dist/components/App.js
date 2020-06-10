import Yogurt from '../yogurt';
var data = {
    showError: false,
    showSuccess: false,
    showDashboard: true,
    showAlbum: false,
    showImage: false,
    currentAlbum: null,
    currentImage: null,
};
var template = function (props) { return "\n\t<div id='loading-modal'></div>\n\t<header id=\"app-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='dashboard-section' class=\"" + (props.showDashboard ? '' : 'hidden') + "\"></section>\n\t\t\t<section id='album-detail-section' class=\"" + (props.showAlbum ? '' : 'hidden') + "\"></section>\n\t\t\t<section id='image-detail-section' class=\"" + (props.showImage ? '' : 'hidden') + "\"></section>\n\t\t</div>\n\t</main>\n"; };
var App = new Yogurt({
    selector: '#app',
    data: data,
    template: template
});
export default App;
