import Yogurt from "../yogurt"
import Dashboard from "./Dashboard";

const state: AddAlbumState = {
	albumTitle: '',
	albumTitleError: '',
	genericError: false
}

const template: Template<AddAlbumState> = (props) => `
	<div class="text-xl border-b-2 border-gray-200 mb-4 p-1 text-gray-200">Add New Album</div>
	<form id="add-album-form" action="#" class="flex justify-between items-center">
		<input id="add-album-title" type="text" maxlength="45" name="title" placeholder="Album Title" class="rounded p-2 flex-grow mr-4 ${props.albumTitleError || props.genericError ? 'border-2 border-red-600 outline-none' : ''}" required />
		<input type="submit" class="bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue" value="Add" />
	</form>
`

const AddAlbumForm = new Yogurt<AddAlbumState>({
	selector: '#add-album-section',
	state,
	template,
	childOf: Dashboard
});

export default AddAlbumForm;