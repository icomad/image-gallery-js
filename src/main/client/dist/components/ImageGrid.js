import Yogurt from "../yogurt";
function makeImageGridComponent(images, component) {
    var state = {
        images: images,
        page: 1
    };
    var template = function (props) { return !props.images.length ?
        "\n\t\t<div class=\"w-full rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\">No images to show! Add one using the form above.</div>\n\t"
        :
            "\n\t\t<div class=\"mr-4 " + (props.page > 1 ? '' : 'hidden') + "\">\n\t\t\t<a id=\"prev-page-btn\" href=\"#\" class=\"text-gray-800 transition-default hover:text-blue-500 text-4xl\">\n\t\t\t\t<i class=\"fas fa-chevron-circle-left pointer-events-none\"></i>\n\t\t\t</a>\n\t\t</div>\n\t\t<div class='flex-grow image-grid'>\n\t\t\t" + props.images.sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); }).map(function (image, index) { return "\n\t\t\t\t<div id=\"image-" + image.id + "\" data-id=\"" + image.id + "\" class=\"image cursor-pointer shadow-lg flex flex-col p-2 rounded items-center bg-white text-gray-800 transition-default hover:bg-blue-200 " + ((index < 5 * props.page) && (index >= (5 * props.page) - 5) ? '' : 'hidden') + "\">\n\t\t\t\t\t<div class=\"pointer-events-none rounded-full flex w-24 h-24 overflow-hidden\">\n\t\t\t\t\t\t<img src=\"/resources/images/thumbnail_" + image.path + "\" alt=\"" + image.title + "\" style=\"object-fit: cover\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"pointer-events-none border-b border-gray-800 text-gray-800 self-stretch text-center mt-2\">\n\t\t\t\t\t\t<span class=\"font-bold\">Title:</span> <span>" + image.title + "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"; }).join('') + "\n\t\t</div>\n\t\t<div class=\"ml-4 " + (props.page < images.length / 5 ? '' : 'hidden') + "\">\n\t\t\t<a id=\"next-page-btn\" href=\"#\" class=\"text-gray-800 transition-default hover:text-blue-500 text-4xl\">\n\t\t\t\t<i class=\"fas fa-chevron-circle-right pointer-events-none\"></i>\n\t\t\t</a>\n\t\t</div>\n\t"; };
    var ImageGrid = new Yogurt({
        selector: '#image-grid',
        state: state,
        template: template,
        childOf: component
    });
    ImageGrid.render();
    return ImageGrid;
}
export default makeImageGridComponent;
