import Dashboard from "./Dashboard";
import Yogurt from "../yogurt";
var state = {
    albums: [],
    attempted: false
};
var template = function (props) { return !props.albums.length ?
    "<div class=\"rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\" draggable=\"false\">There are no albums to show. Add one using the form above.</div>" :
    props.albums.sort(function (a, b) { return b.order - a.order; }).map(function (album) { return "\n\t\t<div id=\"album-" + album.id + "\" data-id=\"" + album.id + "\" data-order=\"" + album.order + "\" class=\"album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200\" draggable=\"true\">\n\t\t\t<div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Album Title:</span> <span>" + album.title + "</span></div>\n\t\t\t<div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Created:</span> <span>" + album.createdAt + "</span></div>\n\t\t</div>\n\t"; }).join(''); };
var AlbumGrid = new Yogurt({
    selector: '#album-grid',
    state: state,
    template: template,
    childOf: Dashboard
});
export default AlbumGrid;
