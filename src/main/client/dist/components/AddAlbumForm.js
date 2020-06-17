import Yogurt from "../yogurt";
import Dashboard from "./Dashboard";
var state = {
    albumTitle: '',
    albumTitleError: '',
    genericError: false
};
var template = function (props) { return "\n\t<div class=\"text-xl border-b-2 border-gray-200 mb-4 p-1 text-gray-200\">Add New Album</div>\n\t<form id=\"add-album-form\" action=\"#\" class=\"flex justify-between items-center\">\n\t\t<input id=\"add-album-title\" type=\"text\" maxlength=\"45\" name=\"title\" placeholder=\"Album Title\" class=\"rounded p-2 flex-grow mr-4 " + (props.albumTitleError || props.genericError ? 'border-2 border-red-600 outline-none' : '') + "\" required />\n\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Add\" />\n\t</form>\n"; };
var AddAlbumForm = new Yogurt({
    selector: '#add-album-section',
    state: state,
    template: template,
    childOf: Dashboard
});
export default AddAlbumForm;
