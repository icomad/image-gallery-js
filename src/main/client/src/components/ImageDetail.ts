import Yogurt from "../yogurt";
import App from "./App";

export default function makeImageDetailComponent(image: Image, comments: CommentWithUsername[]){
	const state: ImageDetailState = {
		image,
		comments,
		commentBody: '',
		commentBodyError: false
	}

	const template: Template<ImageDetailState> = (props) => `
		<div id='image-detail-modal' class='w-full h-full flex justify-center items-center fixed block top-0 left-0 z-50' style="background: rgba(0, 0, 0, .45)">
			<div class='p-8 rounded w-11/12 flex flex-col md:flex-row justify-between text-gray-800 bg-gray-100' style="max-height: 90vh;">
				<div class="w-full md:w-2/3 flex flex-col justify-between">
					<div class="rounded p-2 shadow-lg bg-white flex flex-col justify-start mb-5">
						<div class="border-b border-gray-500 p-1 flex justify-start items-center">
							<span class="font-bold">Title:</span>&nbsp;
							<span>${props.image.title}</span>
						</div>
						<div class="border-b border-gray-500 p-1 flex justify-start items-center">
							<span class="font-bold">Description:</span>&nbsp;
							<span>${props.image.description}</span>
						</div>
						<div class="border-b border-gray-500 p-1 flex justify-start items-center">
							<span class="font-bold">Created:</span>&nbsp;
							<span>${props.image.createdAt}</span>
						</div>
					</div>
					<div class="flex-grow rounded overflow-hidden shadow-lg flex justify-center items-center bg-white">
						<img class='w-full h-full' src="/resources/images/${props.image.path}" alt="${props.image.title}" style="object-fit: contain;">
					</div>
				</div>

				<div class="mt-5 md:mt-0 md:ml-5 w-full md:w-1/3 flex flex-col justify-between items-stretch rounded shadow-lg bg-white">
					<div class="relative flex-grow flex flex-col justify-start border-b border-black-800 overflow-auto">
						<div class="rounded bg-white sticky top-0 z-40 flex justify-start items-center border-b border-black-800 p-4 font-bold mb-2">Comments</div>
						<div class="flex-grow overflow-y-auto overflow-x-hidden absolute mt-12 w-11/12 p-4">
							${props.comments.map(comment => `
								<div class="rounded py-1 px-2 w-full flex flex-col bg-blue-200 mb-1">
									<div style="word-break: break-word;overflow-wrap:break-word">${comment.comment.body}</div>
									<div class="text-sm italic font-semibold">
										- ${comment.username} (${new Date(comment.comment.createdAt).toLocaleString()})
									</div>
								</div>
							`).join('')}
						</div>
					</div>
					<div class="flex p-4">
						<form id='add-comment-form' class="w-full flex justify-between" action="#">
							<input id='add-comment-body' type="text" name="add-comment-body" placeholder="Write here..." class="flex-grow rounded p-2 bg-gray-200 ${props.commentBodyError ? 'border-2 border-red-600 outline-none text-red-600' : ''}" required />
							<input type="submit" class="bg-transparent text-gray-800 cursor-pointer outline-none btn btn-blue ml-2" value="Send" required />
						</form>
					</div>
				</div>
			</div>
		</div>
	`;

	const ImageDetail = new Yogurt<ImageDetailState>({
		selector: '#image-detail-section',
		state,
		template,
		childOf: App
	});

	ImageDetail.render();

	return ImageDetail;
}