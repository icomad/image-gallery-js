import Yogurt from '../yogurt';
var data = {
    showSuccess: false,
    showError: false
};
var template = function (props) { return "\n\t<header id=\"index-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='signin-section'></section>\n\t\t\t<section id='signup-section'></section>\n\t\t</div>\n\t</main>\n"; };
var Index = new Yogurt({
    selector: '#app',
    data: data,
    template: template
});
export default Index;
