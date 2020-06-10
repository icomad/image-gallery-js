import Yogurt from '../yogurt';
import Index from './Index';
import { contextPath } from '../utils';
var data = {
    isLogged: false,
};
var template = function (props) { return "\n\t<nav>\n\t\t<div class=\"container mx-auto\">\n\t\t\t<div class=\"w-full flex justify-between items-center\">\n\t\t\t\t<a id=\"home-btn\" href=\"" + contextPath + "\" class=\"brand-logo\">Image Gallery</a>\n\t\t\t\t<div class=\"flex-grow ml-6\">\n\t\t\t\t\t<a id=\"dashboard-btn\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? '' : 'hidden') + "\">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t<a id=\"signout-btn\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? '' : 'hidden') + "\">Sign Out</a>\n\t\t\t\t\t<a id=\"signin-nav\" href=\"#\" class=\"btn btn-blue mr-3 " + (props.isLogged ? 'hidden' : '') + "\">Sign In</a>\n\t\t\t\t\t<a id=\"signup-nav\" href=\"#\" class=\"btn btn-blue " + (props.isLogged ? 'hidden' : '') + "\">Sign Up</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n"; };
var IndexNavbar = new Yogurt({
    selector: '#index-navbar',
    data: data,
    template: template,
    attachTo: Index
});
export default IndexNavbar;
