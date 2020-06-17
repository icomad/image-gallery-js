import Yogurt from "../yogurt";

function makeImageGridComponent(images: Image[], component: IYogurt<AlbumDetailState>){
	const state: ImageGridState = {
		images,
		page: 1
	}

	const template: Template<ImageGridState> = (props) => !props.images.length ? 
	`
		<div class="w-full rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center">No images to show! Add one using the form above.</div>
	` 
	:
	`
		<div class="mr-4 ${props.page > 1 ? '' : 'hidden'}">
			<a id="prev-page-btn" href="#" class="text-gray-800 transition-default hover:text-blue-500 text-4xl">
				<i class="fas fa-chevron-circle-left pointer-events-none"></i>
			</a>
		</div>
		<div class='flex-grow image-grid'>
			${props.images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((image, index) => `
				<div id="image-${image.id}" data-id="${image.id}" class="image cursor-pointer shadow-lg flex flex-col p-2 rounded items-center bg-white text-gray-800 transition-default hover:bg-blue-200 ${(index < 5 * props.page) && (index >= (5 * props.page) - 5) ? '' : 'hidden'}">
					<div class="pointer-events-none rounded-full flex w-24 h-24 overflow-hidden">
						<img src="/resources/images/thumbnail_${image.path}" alt="${image.title}" style="object-fit: cover" />
					</div>
					<div class="pointer-events-none border-b border-gray-800 text-gray-800 self-stretch text-center mt-2">
						<span class="font-bold">Title:</span> <span>${image.title}</span>
					</div>
				</div>
			`).join('')}
		</div>
		<div class="ml-4 ${props.page < images.length / 5 ? '' : 'hidden'}">
			<a id="next-page-btn" href="#" class="text-gray-800 transition-default hover:text-blue-500 text-4xl">
				<i class="fas fa-chevron-circle-right pointer-events-none"></i>
			</a>
		</div>
	`

	const ImageGrid = new Yogurt<ImageGridState>({
		selector: '#image-grid',
		state,
		template,
		childOf: component
	});

	ImageGrid.render();

	return ImageGrid;
}

export default makeImageGridComponent;