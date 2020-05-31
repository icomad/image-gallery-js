import { render } from "./utils";
/**
 *
 * Album Grid
 *
 */
export var albumGrid = function (albums) {
    if (!albums.length) {
        return render("<div class=\"rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\" draggable=\"false\">There are no albums to show. Add one using the form above.</div>");
    }
    return albums.map(function (album) { return render(albumElem(album)); });
};
export var albumElem = function (album) { return "\n      <div id=\"album-" + album.id + "\" data-order=\"" + album.order + "\" data-target=\"" + album.id + "\" data-title=\"" + album.title + "\" class=\"album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200\" draggable=\"true\">\n        <div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Album Title:</span> <span>" + album.title + "</span></div>\n        <div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Created:</span> <span>" + album.createdAt + "</span></div>\n      </div>\n    "; };
/**
 *
 * Image Grid
 *
 */
export var imageGrid = function (albumId) { return render("<div class=\"image-grid\" data-album=\"" + albumId + "\"></div>"); };
export var imageCollection = function (images) {
    if (!images.length) {
        return render("<div style=\"grid-column: 1/6\" class=\"rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\">There are no images to show. Add one using the form above.</div>");
    }
    return images.map(function (image) { return render(imageElem(image)); });
};
export var imageElem = function (image) { return "\n    <div id=\"image-" + image.id + "\" data-target=\"" + image.id + "\" class=\"image\">\n      <div class=\"cursor-pointer shadow-lg flex flex-col p-2 rounded items-center bg-white text-gray-800 transition-default hover:bg-blue-200\">\n        <div class=\"rounded-full flex w-24 h-24 overflow-hidden\">\n          <img src=\"/image-gallery/resources/images/" + image.path + "\" alt=\"" + image.title + "\" style=\"object-fit: cover\" />\n        </div>\n        <div class=\"border-b border-gray-800 text-gray-800 self-stretch text-center mt-2\">\n          <span class=\"font-bold\">Title:</span> <span>" + image.title + "</span>\n        </div>\n      </div>\n    </div>\n"; };
