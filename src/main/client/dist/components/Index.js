import Yogurt from '../yogurt';
var state = {
    showSuccess: false,
    showError: false,
    showIndex: true,
};
var template = function (props) { return "\n\t<header id=\"index-navbar\" class='header'></header>\n\t<main class=\"bg-gray-100 flex-grow\">\n\t\t<div class=\"container mx-auto p-4\">\n\t\t\t<section id='error-alert' class='mt-5 flex w-full justify-center items-center " + (props.showError ? '' : 'hidden') + "'></section>\n\t\t\t<section id='success-alert' class='mt-5 flex w-full justify-center items-center " + (props.showSuccess ? '' : 'hidden') + "'></section>\n\t\t\t<section id='index'>\n\t\t\t\t" + (props.showIndex ? "<div class=\"mt-12 w-full flex justify-center\">\n\t\t\t\t\t<div class=\"text-3xl font-semibold text-gray-800\">\n\t\t\t\t\t\tProject for the exam of Web Technologies\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"mt-12 w-full flex justify-center\">\n\t\t\t\t\t<div class=\"text-xl text-gray-800\">\n\t\t\t\t\t\tCheck the code here: <a class=\"text-blue-500 transition-default hover:text-blue-300\" target=\"_blank\" href=\"https://github.com/icomad/image-gallery-js\">Github Repository</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>" : "") + "\n\t\t\t</section>\n\t\t\t<section id='signin-section'></section>\n\t\t\t<section id='signup-section'></section>\n\t\t</div>\n\t</main>\n"; };
var Index = new Yogurt({
    selector: '#app',
    state: state,
    template: template
});
export default Index;
