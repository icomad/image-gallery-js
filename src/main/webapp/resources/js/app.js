(function () {
    'use strict';

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    function isLogged() {
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
    function render(str) {
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
    function sortableGrid(grid, onUpdate) {
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

    /**
     * NAVIGATIONS
     */
    var dashboardNav = document.getElementById("dashboard-nav");
    var signInNav = document.getElementById("signin-nav");
    var signUpNav = document.getElementById("signup-nav");
    /**
     * ACTIONS
     */
    var signOutBtn = document.getElementById("signout-btn");
    var dashboardBtn = document.getElementById("dashboard-btn");
    var homeBtn = document.getElementById("home-btn");
    /**
     * FORM FIELDS
     */
    var signInForm = document.getElementById("signin-form");
    var signUpForm = document.getElementById("signup-form");
    var signUpEmail = document.getElementById('email-signup');
    var signUpUsername = document.getElementById('username-signup');
    var signUpPassword = document.getElementById('password-signup');
    var signUpConfirmPassword = document.getElementById('confirm-password-signup');
    var signInUsername = document.getElementById('username-signin');
    var signInPassword = document.getElementById('password-signin');
    var confirmPasswordError = document.getElementById('confirm-password-error');
    var emailSignUpError = document.getElementById('email-signup-error');
    var usernameSignUpError = document.getElementById('username-signup-error');
    var usernameSignInError = document.getElementById('username-signin-error');
    var passwordSignInError = document.getElementById('password-signin-error');
    var passwordSignUpError = document.getElementById('password-signup-error');
    var addAlbumForm = document.getElementById("add-album-form");
    var addImageForm = document.getElementById('add-image-form');
    var addImageAlbumId = document.getElementById('add-image-album-id');
    /**
     * LAYOUT SECTIONS
     */
    var signInSection = document.getElementById("signin-section");
    var signUpSection = document.getElementById("signup-section");
    var errorSection = document.getElementById('error-section');
    var errorBody = document.getElementById('error-body');
    var successSection = document.getElementById('success-section');
    var successBody = document.getElementById('success-body');
    var dashboardSection = document.getElementById("dashboard-section");
    var albumSection = document.getElementById("album-section");
    var imageSection = document.getElementById("image-section");
    var albumGrid = document.getElementById('album-grid');
    var albumSectionTitle = document.getElementById('album-section-title');
    var imageGridContainer = document.getElementById('image-grid-container');
    var backButton = document.getElementById('back-button');
    var nextButton = document.getElementById('next-button');

    var contextPath = '/image-gallery-js';

    /**
     *
     * Album Grid
     *
     */
    var albumGrid$1 = function (albums) {
        if (!albums.length) {
            return render("<div class=\"rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\" draggable=\"false\">There are no albums to show. Add one using the form above.</div>");
        }
        return albums.map(function (album) { return render(albumElem(album)); });
    };
    var albumElem = function (album) { return "\n      <div id=\"album-" + album.id + "\" data-order=\"" + album.order + "\" data-target=\"" + album.id + "\" data-title=\"" + album.title + "\" class=\"album cursor-pointer shadow-lg flex flex-col p-2 rounded items-stretch bg-white text-gray-800 transition-default hover:bg-blue-200\" draggable=\"true\">\n        <div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Album Title:</span> <span>" + album.title + "</span></div>\n        <div class=\"pointer-events-none border-b border-gray-800 p-2\"><span class=\"font-bold\">Created:</span> <span>" + album.createdAt + "</span></div>\n      </div>\n    "; };
    /**
     *
     * Image Grid
     *
     */
    var imageGrid = function (albumId) { return render("<div class=\"image-grid\" data-album=\"" + albumId + "\"></div>"); };
    var imageCollection = function (images) {
        if (!images.length) {
            return render("<div style=\"grid-column: 1/6\" class=\"rounded shadow p-4 bg-yellow-500 text-gray-800 flex justify-center items-center\">There are no images to show. Add one using the form above.</div>");
        }
        return images.map(function (image) { return render(imageElem(image)); });
    };
    var imageElem = function (image) { return "\n    <div id=\"image-" + image.id + "\" data-target=\"" + image.id + "\" class=\"image\">\n      <div class=\"cursor-pointer shadow-lg flex flex-col p-2 rounded items-center bg-white text-gray-800 transition-default hover:bg-blue-200\">\n        <div class=\"rounded-full flex w-24 h-24 overflow-hidden\">\n          <img src=\"/image-gallery/resources/images/" + image.path + "\" alt=\"" + image.title + "\" style=\"object-fit: cover\" />\n        </div>\n        <div class=\"border-b border-gray-800 text-gray-800 self-stretch text-center mt-2\">\n          <span class=\"font-bold\">Title:</span> <span>" + image.title + "</span>\n        </div>\n      </div>\n    </div>\n"; };

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __spreadArrays$1 = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    function forbidAccess() {
        displayError("You are not signed in!");
        window.location.href = "" + contextPath;
    }
    function goBackHome() {
        window.location.href = contextPath;
    }
    function displayError(error) {
        errorBody.innerText = error;
        errorSection.classList.remove('hidden');
    }
    function displaySuccessMessage(message) {
        successBody.innerText = message;
        successSection.classList.remove('hidden');
    }
    function enableDeleteAlert() {
        var deleteAlertButtons = document.querySelectorAll('.alert-delete') || [];
        deleteAlertButtons.forEach(function (button) { return button.addEventListener('click', function () { return errorSection.classList.add('hidden'); }); });
    }
    function toggleDashboardSection() {
        if (!isLogged()) {
            displayError("You are not signed in!");
            return;
        }
        if (dashboardSection.classList.contains('hidden')) {
            addImageForm.reset();
            albumSection.classList.add('hidden');
            imageSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
        }
    }
    function nextImagePage(e) {
        console.log('ma funziona?');
        var startingIndex = parseInt(e.currentTarget.dataset.index);
        console.log(e.currentTarget.dataset.index);
        console.log(startingIndex);
        // @ts-ignore
        var imageGrid = __spreadArrays$1(imageGridContainer.children).find(function (child) { return !child.classList.contains('hidden'); });
        console.log(imageGrid);
        if (imageGrid !== undefined) {
            __spreadArrays$1(imageGrid.children).forEach(function (image, index) {
                if (index < startingIndex)
                    image.classList.add('hidden');
                if (index >= startingIndex && index < startingIndex + 5)
                    image.classList.remove('hidden');
            });
        }
    }
    function prevImagePage() { }
    function toggleAlbumSection(e) {
        return __awaiter(this, void 0, void 0, function () {
            var albumId, albumTitle, imageGridRetrieved, response, _a, _b, album, images, imageGridElem_1, imageCollectionElem, error, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!isLogged()) {
                            displayError("You are not signed in!");
                            return [2 /*return*/];
                        }
                        nextButton.classList.add('hidden');
                        nextButton.dataset.index = "0";
                        backButton.classList.add('hidden');
                        backButton.dataset.index = "0";
                        albumId = e.currentTarget.dataset.target;
                        albumTitle = e.currentTarget.dataset.title;
                        albumSectionTitle.innerText = albumTitle;
                        addImageAlbumId.value = albumId;
                        imageGridRetrieved = __spreadArrays$1(imageGridContainer.children).find(function (child) { return child.dataset.album == albumId; });
                        if (imageGridRetrieved !== undefined) {
                            dashboardSection.classList.add('hidden');
                            imageSection.classList.add('hidden');
                            albumSection.classList.remove('hidden');
                            if (imageGridRetrieved.childElementCount > 5) {
                                nextButton.classList.remove('hidden');
                                nextButton.dataset.index = "5";
                            }
                            // @ts-ignore
                            __spreadArrays$1(imageGridContainer.children).forEach(function (child) {
                                child.dataset.album !== albumId ? child.classList.add('hidden') : child.classList.remove('hidden');
                            });
                            return [2 /*return*/];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/images?albumId=" + albumId)];
                    case 2:
                        response = _c.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        _b = _c.sent(), album = _b.album, images = _b.images;
                        if (images.length > 5) {
                            nextButton.classList.remove('hidden');
                            nextButton.dataset.index = "5";
                        }
                        imageGridElem_1 = imageGrid(album.id);
                        imageCollectionElem = imageCollection(images);
                        if (Array.isArray(imageCollectionElem)) {
                            imageCollectionElem.forEach(function (image, index) {
                                image.addEventListener('click', toggleImageModal);
                                if (index > 4)
                                    image.classList.add('hidden');
                                else
                                    image.classList.remove('hidden');
                                imageGridElem_1.appendChild(image);
                            });
                        }
                        else
                            imageGridElem_1.appendChild(imageCollectionElem);
                        imageGridContainer.appendChild(imageGridElem_1);
                        if (albumSection.classList.contains('hidden')) {
                            dashboardSection.classList.add('hidden');
                            imageSection.classList.add('hidden');
                            albumSection.classList.remove('hidden');
                            // @ts-ignore
                            __spreadArrays$1(imageGridContainer.children).forEach(function (child) {
                                child.dataset.album !== albumId ? child.classList.add('hidden') : child.classList.remove('hidden');
                            });
                        }
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _c.sent();
                        displayError("Something went wrong! " + error.error);
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _c.sent();
                        console.log(e_1);
                        displayError("Something went wrong!");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    function addImage(e) {
        return __awaiter(this, void 0, void 0, function () {
            var body, response, _a, image_1, imageGrid_1, imageElement, error, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        if (!isLogged()) {
                            displayError("You are not signed in!");
                            return [2 /*return*/];
                        }
                        body = new FormData(addImageForm);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/images", { method: 'post', body: body })];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        image_1 = _b.sent();
                        imageGrid_1 = __spreadArrays$1(imageGridContainer.children).find(function (child) { return child.dataset.album == image_1.albumId; });
                        if (imageGrid_1.childElementCount === 1 && !imageGrid_1.firstElementChild.classList.contains('image')) {
                            imageGrid_1.removeChild(imageGrid_1.firstElementChild);
                        }
                        imageElement = render(imageElem(image_1));
                        imageElement.addEventListener('click', toggleImageModal);
                        imageGrid_1.insertBefore(imageElement, imageGrid_1.firstElementChild);
                        if (imageGrid_1.childElementCount > 5) {
                            nextButton.classList.remove('hidden');
                            nextButton.dataset.index = "5";
                            // @ts-ignore
                            __spreadArrays$1(imageGrid_1.children).forEach(function (child, index) {
                                if (index > 4)
                                    child.classList.add('hidden');
                                else
                                    child.classList.remove('hidden');
                            });
                        }
                        addImageForm.reset();
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        displayError("Something went wrong! " + error.error);
                        addImageForm.reset();
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_2 = _b.sent();
                        console.log(e_2);
                        displayError("Something went wrong!");
                        addImageForm.reset();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    function toggleImageModal(e) {
    }
    function signOut() {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isLogged()) {
                            displayError("You are not signed in!");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(contextPath + "/signout")];
                    case 2:
                        response = _a.sent();
                        if (response.status === 200) {
                            sessionStorage.removeItem("user");
                            displaySuccessMessage("You successfully signed out!");
                            window.location.href = contextPath;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        displayError('Something went wrong! Network error!');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function retrieveAlbums() {
        return __awaiter(this, void 0, void 0, function () {
            var response, albums, albumCollection, _i, albumCollection_1, album, error, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isLogged()) {
                            displayError("You are not signed in!");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, fetch(contextPath + "/albums")];
                    case 2:
                        response = _a.sent();
                        if (!(response.status === 200)) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        albums = _a.sent();
                        albumCollection = albumGrid$1(albums);
                        if (Array.isArray(albumCollection)) {
                            for (_i = 0, albumCollection_1 = albumCollection; _i < albumCollection_1.length; _i++) {
                                album = albumCollection_1[_i];
                                album.addEventListener('click', toggleAlbumSection);
                                albumGrid.appendChild(album);
                            }
                        }
                        else
                            albumGrid.appendChild(albumCollection);
                        sortableGrid(albumGrid, function () { return updateOrder(); });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        error = _a.sent();
                        displayError('Something went wrong! ' + error.error);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_6 = _a.sent();
                        displayError('Something went wrong! Network error!');
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    function updateOrder() {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, album, body, response, error, success, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = albumGrid.children;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        album = _a[_i];
                        body = new FormData();
                        body.append("albumId", album.dataset.target);
                        body.append("newOrder", album.dataset.order);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, fetch(contextPath + "/albums", { method: 'PUT', body: body })];
                    case 3:
                        response = _b.sent();
                        if (!(response.status !== 200)) return [3 /*break*/, 5];
                        return [4 /*yield*/, response.json()];
                    case 4:
                        error = _b.sent();
                        displayError("OPS! Something went wrong! " + error.error);
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        success = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_7 = _b.sent();
                        console.log(e_7);
                        displayError("Something went wrong!");
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function addAlbum(e) {
        return __awaiter(this, void 0, void 0, function () {
            var body, response, _a, album, albumElement, error, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        if (!isLogged()) {
                            displayError("You are not signed in!");
                            return [2 /*return*/];
                        }
                        body = new FormData(addAlbumForm);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, fetch(contextPath + "/albums", { method: 'POST', body: body })];
                    case 2:
                        response = _b.sent();
                        _a = response.status;
                        switch (_a) {
                            case 200: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 500: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        album = _b.sent();
                        if (albumGrid.childElementCount === 1 && !albumGrid.firstElementChild.classList.contains('album')) {
                            albumGrid.removeChild(albumGrid.firstElementChild);
                        }
                        albumElement = render(albumElem(album));
                        albumElement.addEventListener('click', toggleAlbumSection);
                        albumGrid.insertBefore(albumElement, albumGrid.firstElementChild);
                        addAlbumForm.reset();
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        error = _b.sent();
                        displayError('Something went wrong! ' + error.error);
                        addAlbumForm.reset();
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_8 = _b.sent();
                        console.log(e_8);
                        displayError("Something went wrong!");
                        addAlbumForm.reset();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }

    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    document.addEventListener("DOMContentLoaded", function () { return __awaiter$1(void 0, void 0, void 0, function () {
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isLogged()) {
                        forbidAccess();
                        return [2 /*return*/];
                    }
                    enableDeleteAlert();
                    return [4 /*yield*/, retrieveAlbums()];
                case 1:
                    _a.sent();
                    homeBtn.addEventListener('click', goBackHome);
                    dashboardNav.addEventListener('click', toggleDashboardSection);
                    signOutBtn.addEventListener('click', signOut);
                    addAlbumForm.addEventListener('submit', addAlbum);
                    addImageForm.addEventListener('submit', addImage);
                    nextButton.addEventListener('click', nextImagePage);
                    backButton.addEventListener('click', prevImagePage);
                    return [2 /*return*/];
            }
        });
    }); });

}());
