import Yogurt from "../yogurt";

function makeAddImageFormComponent(albumId: number, component: IYogurt<AlbumDetailData>){
	const data: AddImageData = {
		albumId,
		file: null,
		description: '',
		title: ''
	}

	const template: Template<AddImageData> = (props) => `
		<div class="rounded p-2 shadow-xl flex flex-col bg-blue-600">
			<div class="text-xl border-b-2 border-gray-200 mb-4 py-1 px-8 text-gray-200">Add Image</div>
			<form id="add-image-form" action="#" class="flex flex-col">
					<input id="add-image-file" type="file" name="imageFile" placeholder="Image File" class="cursor-pointer rounded p-2 mb-2 text-gray-800 bg-white" required />
					<input id="add-image-title" type="text" maxlength="45" name="title" placeholder="Image Title" class="rounded p-2 mb-2" required />
					<textarea style="resize: none" id="add-image-description" type="text" rows="4" maxlength="255" name="description" placeholder="Image Description" class="rounded p-2 mb-2" required></textarea>
					<input type="submit" class="bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue" value="Add" />
			</form>
		</div>
	`;

	const AddImageForm = new Yogurt<AddImageData>({
		selector: '#add-image-section',
		data,
		template,
		attachTo: component
	});

	AddImageForm.render();

	return AddImageForm;
}

export default makeAddImageFormComponent;