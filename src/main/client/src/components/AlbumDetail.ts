import App from "./App";
import Yogurt from "../yogurt";
import makeAddImageFormComponent from "./AddImageForm";
import makeImageGridComponent from "./ImageGrid";

function makeAlbumDetailComponent(album: Album, images: Image[]){
	const data: AlbumDetailData = {
		album,
		images,
		imageForm: null,
		imageGrid: null,
	}

	const template: Template<AlbumDetailData> = (props) => `
		<div id="album-section-title" class="mt-2 w-full flex justify-center items-center text-3xl font-semibold text-blue-800">${album.title}</div>
		<div id='add-image-section' class="mt-6 w-full flex justify-center"></div>
		<div class="my-6 w-full flex flex-wrap justify-between items-center">
				<div class="w-full mb-4 text-lg font-bold text-blue-500 border-b border-blue-500">Images</div>
				<div id='image-grid' class='w-full flex justify-between items-center'></div>
		</div>
	`;

	const AlbumDetail = new Yogurt<AlbumDetailData>({
		selector: '#album-detail-section',
		data,
		template,
		attachTo: App
	});

	AlbumDetail.render();
	
	const AddImageForm = makeAddImageFormComponent(AlbumDetail.data.album.id, AlbumDetail);
	AlbumDetail.data.imageForm = AddImageForm;

	const ImageGrid = makeImageGridComponent(AlbumDetail.data.images, AlbumDetail);
	AlbumDetail.data.imageGrid = ImageGrid;

	return AlbumDetail;
}

export default makeAlbumDetailComponent;