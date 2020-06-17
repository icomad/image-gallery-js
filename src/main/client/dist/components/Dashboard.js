import Yogurt from "../yogurt";
import App from "./App";
var state = {};
var template = function (props) { return "\n\t<div class=\"mt-6 w-full flex justify-center\">\n\t\t<div id='add-album-section' class=\"rounded p-2 shadow-xl flex flex-col justify-start bg-blue-600\"></div>\n\t</div>\n\n\t<div class=\"my-6 w-full flex flex-wrap justify-center\" >\n\t\t<div class=\"w-full mb-2 text-lg font-bold text-blue-500 border-b border-blue-500\">Albums</div>\n\t\t<div class=\"w-full text-sm mb-4 text-gray-800\">Drag and drop an album to sort it differently.</div>\n\t\t<section id=\"album-grid\" class=\"w-full album-grid\"></section>\n\t</div>\n"; };
var Dashboard = new Yogurt({
    selector: '#dashboard-section',
    state: state,
    template: template,
    childOf: App
});
export default Dashboard;
