var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function validateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
export function isLogged() {
    return sessionStorage.getItem("user") !== null;
}
function support() {
    if (!window.DOMParser)
        return false;
    var parser = new DOMParser();
    try {
        parser.parseFromString('x', 'text/html');
    }
    catch (err) {
        return false;
    }
    return true;
}
export function render(str) {
    if (support()) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.firstChild;
    }
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
}
function reorderElements(els) {
    var maxOrder = els.length;
    // @ts-ignore
    __spreadArrays(els).forEach(function (element, i) { return element.dataset.order = maxOrder - i; });
}
export function sortableGrid(grid, onUpdate) {
    var draggedElement;
    var nextElement;
    var leftEdgeOffset;
    var rightEdgeOffset;
    var topEdgeOffset;
    var bottomEdgeOffset;
    var startingX;
    grid.addEventListener('dragstart', function (e) {
        draggedElement = e.target;
        nextElement = draggedElement.nextElementSibling;
        startingX = e.clientX;
        leftEdgeOffset = e.clientX - draggedElement.getBoundingClientRect().x;
        rightEdgeOffset = draggedElement.getBoundingClientRect().right - e.clientX;
        topEdgeOffset = e.clientY - draggedElement.getBoundingClientRect().top;
        bottomEdgeOffset = draggedElement.getBoundingClientRect().bottom - e.clientY;
        // @ts-ignore
        __spreadArrays(grid.children).forEach(function (child) { return child.classList.remove('hover:bg-blue-200'); });
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', draggedElement.innerHTML);
        grid.addEventListener('dragover', _onDragOver);
        grid.addEventListener('dragend', _onDragEnd);
        setTimeout(function () {
            draggedElement.classList.add('opacity-25', 'border', 'border-dashed');
        }, 0);
    });
    function _onDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        var target = e.target;
        if (target && target !== draggedElement && target.nodeName == 'DIV') {
            var targetPos = target.getBoundingClientRect();
            var targetCenter = targetPos.right - targetPos.width / 2;
            var shouldSwitch = e.clientX < startingX && ((e.clientX - leftEdgeOffset) < targetCenter || (e.clientY - topEdgeOffset) < targetCenter);
            var switchTarget = shouldSwitch ? target : target.nextSibling;
            grid.insertBefore(draggedElement, switchTarget);
        }
    }
    function _onDragEnd(e) {
        e.preventDefault();
        draggedElement.classList.remove('opacity-25', 'border', 'border-dashed');
        grid.removeEventListener('dragover', _onDragOver);
        grid.removeEventListener('dragend', _onDragEnd);
        reorderElements(grid.children);
        nextElement !== draggedElement.nextSibling ? onUpdate(draggedElement) : false;
        // @ts-ignore
        __spreadArrays(grid.children).forEach(function (child) { return child.classList.add('hover:bg-blue-200'); });
    }
}
