import App from "./App";
import Yogurt from "../yogurt";
import makeAddImageFormComponent from "./AddImageForm";
import makeImageGridComponent from "./ImageGrid";
function makeAlbumDetailComponent(album, images) {
    var state = {
        album: album,
        images: images,
        imageForm: null,
        imageGrid: null,
    };
    var template = function (props) { return "\n\t\t<div id=\"album-section-title\" class=\"mt-2 w-full flex justify-center items-center text-3xl font-semibold text-blue-800\">" + album.title + "</div>\n\t\t<div id='add-image-section' class=\"mt-6 w-full flex justify-center\"></div>\n\t\t<div class=\"my-6 w-full flex flex-wrap justify-between items-center\">\n\t\t\t\t<div class=\"w-full mb-4 text-lg font-bold text-blue-500 border-b border-blue-500\">Images</div>\n\t\t\t\t<div id='image-grid' class='w-full flex justify-between items-center'></div>\n\t\t</div>\n\t"; };
    var AlbumDetail = new Yogurt({
        selector: '#album-detail-section',
        state: state,
        template: template,
        childOf: App
    });
    AlbumDetail.render();
    var AddImageForm = makeAddImageFormComponent(AlbumDetail.state.album.id, AlbumDetail);
    AlbumDetail.state.imageForm = AddImageForm;
    var ImageGrid = makeImageGridComponent(AlbumDetail.state.images, AlbumDetail);
    AlbumDetail.state.imageGrid = ImageGrid;
    return AlbumDetail;
}
export default makeAlbumDetailComponent;
