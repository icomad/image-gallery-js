import App from "./App";
import Yogurt from "../yogurt";
import { contextPath } from "../utils";
var state = {
    isLogged: false
};
var template = function (props) { return "\n\t<nav>\n\t\t<div class=\"container mx-auto\">\n\t\t\t<div class=\"w-full flex justify-between items-center\">\n\t\t\t\t<a id=\"home-btn\" href=\"" + contextPath + "\" class=\"brand-logo\">Image Gallery</a>\n\t\t\t\t<div class=\"flex-grow ml-6\">\n\t\t\t\t\t<a id=\"dashboard-nav\" href=\"#\" class=\"btn btn-blue\">Dashboard</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex\">\n\t\t\t\t\t<a id=\"signout-btn\" href=\"#\" class=\"btn btn-blue\">Sign Out</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n"; };
var AppNavbar = new Yogurt({
    selector: '#app-navbar',
    state: state,
    template: template,
    childOf: App
});
export default AppNavbar;
