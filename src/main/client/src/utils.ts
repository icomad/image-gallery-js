export function validateEmail(mail: string) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

export function isLogged() {
	if (sessionStorage.getItem('user') !== null) return true;
	if (localStorage.getItem('user') !== null) {
		const userWithExpiration = JSON.parse(localStorage.getItem('user')!);
		const now = new Date();
		if (now.getTime() < userWithExpiration.expiry) return true;
		else localStorage.removeItem('user');
	}
	return false;
}

export const contextPath = '/image-gallery-js';

function reorderElements(els: HTMLCollection) {
	const maxOrder = els.length;
	// @ts-ignore
	[...els].forEach((element: HTMLElement, i: number) => (element.dataset.order = maxOrder - i));
}

export function sortableGrid(grid: HTMLElement, onUpdate: (element: HTMLElement) => void) {
	let draggedElement: HTMLElement;
	let nextElement: Element;
	let leftEdgeOffset: number;
	let rightEdgeOffset: number;
	let topEdgeOffset: number;
	let bottomEdgeOffset: number;
	let startingX: number;

	grid.addEventListener('dragstart', (e: DragEvent) => {
		draggedElement = e.target as HTMLElement;
		nextElement = draggedElement.nextElementSibling!;
		startingX = e.clientX;
		leftEdgeOffset = e.clientX - draggedElement.getBoundingClientRect().x;
		rightEdgeOffset = draggedElement.getBoundingClientRect().right - e.clientX;
		topEdgeOffset = e.clientY - draggedElement.getBoundingClientRect().top;
		bottomEdgeOffset = draggedElement.getBoundingClientRect().bottom - e.clientY;

		// @ts-ignore
		[...grid.children].forEach((child) => child.classList.remove('hover:bg-blue-200'));

		e.dataTransfer!.effectAllowed = 'move';
		e.dataTransfer!.setData('text/html', draggedElement.innerHTML!);

		grid.addEventListener('dragover', _onDragOver);
		grid.addEventListener('dragend', _onDragEnd);

		setTimeout(function () {
			draggedElement.classList.add('opacity-25', 'border', 'border-dashed');
		}, 0);
	});

	function _onDragOver(e: DragEvent) {
		e.preventDefault();
		e.dataTransfer!.dropEffect = 'move';

		const target = e.target as HTMLElement;

		if (target && target !== draggedElement && target.nodeName == 'DIV') {
			const targetPos = target.getBoundingClientRect();
			const targetCenter = targetPos.right - targetPos.width / 2;

			const shouldSwitch =
				e.clientX < startingX &&
				(e.clientX - leftEdgeOffset < targetCenter || e.clientY - topEdgeOffset < targetCenter);

			const switchTarget = shouldSwitch ? target : (target.nextSibling as HTMLElement);
			grid.insertBefore(draggedElement, switchTarget);
		}
	}

	function _onDragEnd(e: DragEvent) {
		e.preventDefault();
		draggedElement.classList.remove('opacity-25', 'border', 'border-dashed');
		grid.removeEventListener('dragover', _onDragOver);
		grid.removeEventListener('dragend', _onDragEnd);
		reorderElements(grid.children);
		nextElement !== draggedElement.nextSibling ? onUpdate(draggedElement) : false;
		// @ts-ignore
		[...grid.children].forEach((child) => child.classList.add('hover:bg-blue-200'));
	}
}