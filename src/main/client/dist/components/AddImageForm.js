import Yogurt from "../yogurt";
function makeAddImageFormComponent(albumId, component) {
    var data = {
        albumId: albumId,
        file: null,
        description: '',
        title: ''
    };
    var template = function (props) { return "\n\t\t<div class=\"rounded p-2 shadow-xl flex flex-col bg-blue-600\">\n\t\t\t<div class=\"text-xl border-b-2 border-gray-200 mb-4 py-1 px-8 text-gray-200\">Add Image</div>\n\t\t\t<form id=\"add-image-form\" action=\"#\" class=\"flex flex-col\">\n\t\t\t\t\t<input id=\"add-image-file\" type=\"file\" name=\"imageFile\" placeholder=\"Image File\" class=\"cursor-pointer rounded p-2 mb-2 text-gray-800 bg-white\" required />\n\t\t\t\t\t<input id=\"add-image-title\" type=\"text\" maxlength=\"45\" name=\"title\" placeholder=\"Image Title\" class=\"rounded p-2 mb-2\" required />\n\t\t\t\t\t<textarea style=\"resize: none\" id=\"add-image-description\" type=\"text\" rows=\"4\" maxlength=\"255\" name=\"description\" placeholder=\"Image Description\" class=\"rounded p-2 mb-2\" required></textarea>\n\t\t\t\t\t<input type=\"submit\" class=\"bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue\" value=\"Add\" />\n\t\t\t</form>\n\t\t</div>\n\t"; };
    var AddImageForm = new Yogurt({
        selector: '#add-image-section',
        data: data,
        template: template,
        attachTo: component
    });
    AddImageForm.render();
    return AddImageForm;
}
export default makeAddImageFormComponent;
