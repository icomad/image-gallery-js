import Yogurt from '../yogurt';
var data = {
    message: ''
};
var template = function (props) { return "\n\t<div class=\"w-full md:w-1/2\" role=\"alert\" >\n\t\t<div class=\"bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-between\">\n\t\t\t<span class=\"flex-grow font-bold\">ERROR!</span>\n\t\t\t<button id='error-alert-delete' class=\"alert-delete transition-default hover:text-red-800\"><i class=\"fas fa-times pointer-events-none\"></i></button>\n\t\t</div>\n\t\t<div class=\"border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700\">\n\t\t\t<p id=\"error-body\">" + props.message + "</p>\n\t\t</div>\n\t</div>\n"; };
var ErrorAlert = new Yogurt({
    selector: '#error-alert',
    data: data,
    template: template,
});
export default ErrorAlert;
