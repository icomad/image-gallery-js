var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
export function validateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
export function isLogged() {
    if (sessionStorage.getItem('user') !== null)
        return true;
    if (localStorage.getItem('user') !== null) {
        var userWithExpiration = JSON.parse(localStorage.getItem('user'));
        var now = new Date();
        if (now.getTime() < userWithExpiration.expiry)
            return true;
        else
            localStorage.removeItem('user');
    }
    return false;
}
export var contextPath = '/image-gallery-js';
function reorderElements(els) {
    var maxOrder = els.length;
    // @ts-ignore
    __spread(els).forEach(function (element, i) { return (element.dataset.order = maxOrder - i); });
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
        __spread(grid.children).forEach(function (child) { return child.classList.remove('hover:bg-blue-200'); });
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
            var shouldSwitch = e.clientX < startingX &&
                (e.clientX - leftEdgeOffset < targetCenter || e.clientY - topEdgeOffset < targetCenter);
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
        __spread(grid.children).forEach(function (child) { return child.classList.add('hover:bg-blue-200'); });
    }
}
