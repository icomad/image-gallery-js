import Yogurt from '../yogurt';
var data = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    usernameError: '',
    passwordError: '',
    emailError: '',
    passwordConfirmError: '',
    genericError: false
};
var template = function (props) { return "\n\t<div class=\"w-full flex justify-center\">\n\t\t<div class=\"w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600\">\n\t\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200\">Sign Up</div>\n\t\t\t<form id=\"signup-form\" action=\"#\">\n\t\t\t\t<input id=\"username-signup\" type=\"text\" maxlength=\"45\" name=\"username\" placeholder=\"Username\" class=\"w-full rounded p-2 mb-2 " + (props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"username-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.usernameError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.usernameError + "</div>\n\n\t\t\t\t<input id=\"email-signup\" type=\"email\" name=\"email\" placeholder=\"Email\" class=\"w-full rounded p-2 mb-2 " + (props.emailError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"email-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.emailError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.emailError + "</div>\n\n\t\t\t\t<input id=\"password-signup\" type=\"password\" maxlength=\"45\" name=\"password\" placeholder=\"Password\" class=\"w-full rounded p-2 mb-2 " + (props.passwordError || props.passwordConfirmError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"password-signup-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.passwordError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.passwordError + "</div>\n\n\t\t\t\t<input id=\"confirm-password-signup\" type=\"password\" maxlength=\"45\" name=\"passwordCheck\" placeholder=\"Confirm Password\" class=\"flex w-full rounded p-2 mb-2 " + (props.passwordConfirmError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t\t\t<div id=\"confirm-password-error\" class=\"w-full mb-2 inline-flex px-2 text-sm text-red-600 rounded font-bold " + (props.passwordConfirmError ? '' : 'hidden') + "\" style=\"background: rgba(255, 255, 255, .5)\">" + props.passwordConfirmError + "</div>\n\n\t\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Sign Up\" />\n\t\t\t</form>\n\t\t</div>\n\t</div>\n"; };
var SignUp = new Yogurt({
    selector: '#signup-section',
    data: data,
    template: template,
});
export default SignUp;
