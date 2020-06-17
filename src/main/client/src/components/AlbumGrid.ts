import Dashboard from "./Dashboard";
import Yogurt from "../yogurt";

const state: AlbumGridState = {
	albums: [] as Album[],
	attempted: false
}

const template: Template<AlbumGridState> = (props) => !props.albums.length ? 
	`<div class="rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center" draggable="false">There are no albums to show. Add one using the form above.</div>` :
	props.albums.sort((a, b) => b.order - a.order).map(album => `
		<div id="album-${album.id}" data-id="${album.id}" data-order="${album.order}" class="album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200" draggable="true">
			<div class="pointer-events-none border-b border-gray-800 p-2"><span class="font-bold">Album Title:</span> <span>${album.title}</span></div>
			<div class="pointer-events-none border-b border-gray-800 p-2"><span class="font-bold">Created:</span> <span>${album.createdAt}</span></div>
		</div>
	`).join('')

const AlbumGrid = new Yogurt<AlbumGridState>({
	selector: '#album-grid',
	state,
	template,
	childOf: Dashboard
});

export default AlbumGrid;