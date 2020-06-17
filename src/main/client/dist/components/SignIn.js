import Yogurt from '../yogurt';
var state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    genericError: false,
    remember: false,
};
var template = function (props) { return "\n\t<div class=\"w-full flex justify-center\">\n\t<div class=\"w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600\">\n\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200\">Sign In</div>\n\t\t<form id=\"signin-form\" action=\"#\">\n\t\t\t<input id=\"username-signin\" type=\"text\" name=\"username\" placeholder=\"Username\" class=\"w-full rounded p-2 mb-2 " + (props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t<div id=\"username-signin-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold " + (props.usernameError ? '' : 'hidden') + "\">" + props.usernameError + "</div>\n\n\t\t\t<input id=\"password-signin\" type=\"password\" name=\"password\" placeholder=\"Password\" class=\"w-full rounded p-2 mb-2 " + (props.passwordError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t<div id=\"password-signin-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold " + (props.passwordError ? '' : 'hidden') + "\">" + props.passwordError + "</div>\n\t\t\t<div class=\"w-full mb-2 p-2\">\n\t\t\t\t<label class=\"text-gray-200\">\n\t\t\t\t\t<input class='mr-4' type=\"checkbox\" name=\"remember\" id=\"remember-signin\" " + (props.remember ? 'checked' : '') + " />\n\t\t\t\t\tRemember me?\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Sign In\" />\n\t\t</form>\n\t</div>\n\t</div>\n"; };
var SignIn = new Yogurt({
    selector: '#signin-section',
    state: state,
    template: template,
});
export default SignIn;
