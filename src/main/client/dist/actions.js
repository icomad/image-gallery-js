var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as DOM from "./elements";
import { isLogged, render, sortableGrid, validateEmail } from "./utils";
import { contextPath } from "./constants";
import { albumElem, albumGrid, imageCollection, imageElem, imageGrid } from "./templates";
export function forbidAccess() {
    displayError("You are not signed in!");
    window.location.href = "" + contextPath;
}
export function goBackHome() {
    window.location.href = contextPath;
}
export function displayError(error) {
    DOM.errorBody.innerText = error;
    DOM.errorSection.classList.remove('hidden');
}
export function displaySuccessMessage(message) {
    DOM.successBody.innerText = message;
    DOM.successSection.classList.remove('hidden');
}
export function enableDeleteAlert() {
    var deleteAlertButtons = document.querySelectorAll('.alert-delete') || [];
    deleteAlertButtons.forEach(function (button) { return button.addEventListener('click', function () { return DOM.errorSection.classList.add('hidden'); }); });
}
export function toggleDashboardSection() {
    if (!isLogged()) {
        displayError("You are not signed in!");
        return;
    }
    if (DOM.dashboardSection.classList.contains('hidden')) {
        DOM.addImageForm.reset();
        DOM.albumSection.classList.add('hidden');
        DOM.imageSection.classList.add('hidden');
        DOM.dashboardSection.classList.remove('hidden');
    }
}
export function nextImagePage(e) {
    console.log('ma funziona?');
    var startingIndex = parseInt(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.index);
    console.log(startingIndex);
    // @ts-ignore
    var imageGrid = __spreadArrays(DOM.imageGridContainer.children).find(function (child) { return !child.classList.contains('hidden'); });
    console.log(imageGrid);
    if (imageGrid !== undefined) {
        __spreadArrays(imageGrid.children).forEach(function (image, index) {
            if (index < startingIndex)
                image.classList.add('hidden');
            if (index >= startingIndex && index < startingIndex + 5)
                image.classList.remove('hidden');
        });
    }
}
export function prevImagePage() { }
export function toggleAlbumSection(e) {
    return __awaiter(this, void 0, void 0, function () {
        var albumId, albumTitle, imageGridRetrieved, response, _a, _b, album, images, imageGridElem_1, imageCollectionElem, error, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isLogged()) {
                        displayError("You are not signed in!");
                        return [2 /*return*/];
                    }
                    DOM.nextButton.classList.add('hidden');
                    DOM.nextButton.dataset.index = "0";
                    DOM.backButton.classList.add('hidden');
                    DOM.backButton.dataset.index = "0";
                    albumId = e.currentTarget.dataset.target;
                    albumTitle = e.currentTarget.dataset.title;
                    DOM.albumSectionTitle.innerText = albumTitle;
                    DOM.addImageAlbumId.value = albumId;
                    imageGridRetrieved = __spreadArrays(DOM.imageGridContainer.children).find(function (child) { return child.dataset.album == albumId; });
                    if (imageGridRetrieved !== undefined) {
                        DOM.dashboardSection.classList.add('hidden');
                        DOM.imageSection.classList.add('hidden');
                        DOM.albumSection.classList.remove('hidden');
                        if (imageGridRetrieved.childElementCount > 5) {
                            DOM.nextButton.classList.remove('hidden');
                            DOM.nextButton.dataset.index = "5";
                        }
                        // @ts-ignore
                        __spreadArrays(DOM.imageGridContainer.children).forEach(function (child) {
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
                        DOM.nextButton.classList.remove('hidden');
                        DOM.nextButton.dataset.index = "5";
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
                    DOM.imageGridContainer.appendChild(imageGridElem_1);
                    if (DOM.albumSection.classList.contains('hidden')) {
                        DOM.dashboardSection.classList.add('hidden');
                        DOM.imageSection.classList.add('hidden');
                        DOM.albumSection.classList.remove('hidden');
                        // @ts-ignore
                        __spreadArrays(DOM.imageGridContainer.children).forEach(function (child) {
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
export function addImage(e) {
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
                    body = new FormData(DOM.addImageForm);
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
                    imageGrid_1 = __spreadArrays(DOM.imageGridContainer.children).find(function (child) { return child.dataset.album == image_1.albumId; });
                    if (imageGrid_1.childElementCount === 1 && !imageGrid_1.firstElementChild.classList.contains('image')) {
                        imageGrid_1.removeChild(imageGrid_1.firstElementChild);
                    }
                    imageElement = render(imageElem(image_1));
                    imageElement.addEventListener('click', toggleImageModal);
                    imageGrid_1.insertBefore(imageElement, imageGrid_1.firstElementChild);
                    if (imageGrid_1.childElementCount > 5) {
                        DOM.nextButton.classList.remove('hidden');
                        DOM.nextButton.dataset.index = "5";
                        // @ts-ignore
                        __spreadArrays(imageGrid_1.children).forEach(function (child, index) {
                            if (index > 4)
                                child.classList.add('hidden');
                            else
                                child.classList.remove('hidden');
                        });
                    }
                    DOM.addImageForm.reset();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    displayError("Something went wrong! " + error.error);
                    DOM.addImageForm.reset();
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_2 = _b.sent();
                    console.log(e_2);
                    displayError("Something went wrong!");
                    DOM.addImageForm.reset();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
export function toggleImageModal(e) {
}
export function toggleSignInSection() {
    if (isLogged()) {
        displayError("You are already signed in!");
        return;
    }
    if (DOM.signInSection.classList.contains('hidden')) {
        DOM.signUpSection.classList.add('hidden');
        DOM.signInSection.classList.remove('hidden');
    }
}
export function toggleSignUpSection() {
    if (isLogged()) {
        displayError("You are already signed in!");
        return;
    }
    if (DOM.signUpSection.classList.contains('hidden')) {
        DOM.signInSection.classList.add('hidden');
        DOM.signUpSection.classList.remove('hidden');
    }
}
export function toggleNavbarActiveBtn() {
    DOM.signOutBtn.classList.toggle('hidden');
    DOM.signInNav.classList.toggle('hidden');
    DOM.signUpNav.classList.toggle('hidden');
    DOM.dashboardBtn.classList.toggle('hidden');
}
export function signOut() {
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
export function signUp(e) {
    return __awaiter(this, void 0, void 0, function () {
        var body, response, _a, user, error, err, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (isLogged()) {
                        displayError("You are already signed in!");
                        return [2 /*return*/];
                    }
                    body = new FormData(DOM.signUpForm);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, fetch(contextPath + "/signup", { method: 'POST', body: body })];
                case 2:
                    response = _b.sent();
                    _a = response.status;
                    switch (_a) {
                        case 200: return [3 /*break*/, 3];
                        case 400: return [3 /*break*/, 5];
                        case 500: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    user = _b.sent();
                    sessionStorage.setItem("user", user);
                    window.location.href = contextPath + "/app.html";
                    DOM.signInForm.reset();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    displayError("OH! Something went wrong!");
                    if (error.field === 'username') {
                        toggleSignUpUsernameError(true, error.error);
                    }
                    else if (error.field === 'email') {
                        toggleSignUpMailError(true, error.error);
                    }
                    else if (error.field === 'password') {
                        toggleSignUpPasswordError(true, error.error);
                    }
                    else if (error.field === 'confirmPassword') {
                        toggleSignUpPasswordCheckError(true, error.error);
                        toggleSignUpPasswordError(true, error.error);
                    }
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, response.json()];
                case 8:
                    err = _b.sent();
                    displayError("OH! Something went wrong! " + err.error);
                    DOM.signInForm.reset();
                    return [2 /*return*/];
                case 9: return [2 /*return*/];
                case 10: return [3 /*break*/, 12];
                case 11:
                    e_4 = _b.sent();
                    displayError('Something went wrong! Network error!');
                    DOM.signUpForm.reset();
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
export function signIn(e) {
    return __awaiter(this, void 0, void 0, function () {
        var body, response, _a, user, err, error, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (isLogged()) {
                        displayError("You are already signed in!");
                        return [2 /*return*/];
                    }
                    body = new FormData(DOM.signInForm);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, fetch(contextPath + "/signin", { method: 'POST', body: body })];
                case 2:
                    response = _b.sent();
                    _a = response.status;
                    switch (_a) {
                        case 200: return [3 /*break*/, 3];
                        case 401: return [3 /*break*/, 5];
                        case 500: return [3 /*break*/, 5];
                        case 400: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    user = _b.sent();
                    sessionStorage.setItem("user", user);
                    window.location.href = contextPath + "/app.html";
                    DOM.signInForm.reset();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    err = _b.sent();
                    displayError("OH! Something went wrong! " + err.error);
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, response.json()];
                case 8:
                    error = _b.sent();
                    displayError("OH! Something went wrong!");
                    if (error.field === 'username') {
                        toggleSignInUsernameError(true, error.error);
                    }
                    else if (error.field === 'password') {
                        toggleSignInPasswordError(true, error.error);
                    }
                    return [2 /*return*/];
                case 9: return [2 /*return*/];
                case 10: return [3 /*break*/, 12];
                case 11:
                    e_5 = _b.sent();
                    displayError('Something went wrong! Network error!');
                    DOM.signInForm.reset();
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
export function toggleSignInUsernameError(enable, error) {
    if (error === void 0) { error = null; }
    if (enable && error) {
        DOM.signInUsername.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignInError.classList.remove('hidden');
        DOM.usernameSignInError.innerText = error;
    }
    else {
        DOM.signInUsername.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignInError.innerText = '';
        DOM.usernameSignInError.classList.add('hidden');
    }
}
export function toggleSignInPasswordError(enable, error) {
    if (error === void 0) { error = null; }
    if (enable && error) {
        DOM.signInPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignInError.classList.remove('hidden');
        DOM.passwordSignInError.innerText = error;
    }
    else {
        DOM.signInPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignInError.innerText = '';
        DOM.passwordSignInError.classList.add('hidden');
    }
}
export function toggleSignUpUsernameError(enable, error) {
    if (error === void 0) { error = null; }
    if (enable && error) {
        DOM.signUpUsername.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignUpError.classList.remove('hidden');
        DOM.usernameSignUpError.innerText = error;
    }
    else {
        DOM.signUpUsername.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignUpError.innerText = '';
        DOM.usernameSignUpError.classList.add('hidden');
    }
}
export function toggleSignUpMailError(enable, error) {
    if (error === void 0) { error = null; }
    if (enable && error) {
        DOM.signUpEmail.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.classList.remove('hidden');
        DOM.emailSignUpError.innerText = error;
    }
    else {
        DOM.signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.innerText = '';
        DOM.emailSignUpError.classList.add('hidden');
    }
}
export function toggleSignUpPasswordError(enable, error) {
    if (error === void 0) { error = null; }
    if (enable && error) {
        DOM.signUpPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignUpError.classList.remove('hidden');
        DOM.passwordSignUpError.innerText = error;
    }
    else {
        DOM.signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignUpError.innerText = '';
        DOM.passwordSignUpError.classList.add('hidden');
    }
}
export function toggleSignUpPasswordCheckError(enable, error) {
    if (error === void 0) { error = null; }
    if (enable && error) {
        DOM.signUpConfirmPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.confirmPasswordError.classList.remove('hidden');
        DOM.confirmPasswordError.innerText = error;
    }
    else {
        DOM.signUpConfirmPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.confirmPasswordError.innerText = '';
        DOM.confirmPasswordError.classList.add('hidden');
    }
}
export function checkEmailValidity(e) {
    var el = e.target;
    if (!validateEmail(el.value)) {
        DOM.signUpEmail.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.classList.remove('hidden');
        DOM.emailSignUpError.innerText = 'Enter a valid email!';
    }
    else {
        DOM.signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.innerText = '';
        DOM.emailSignUpError.classList.add('hidden');
    }
}
export function checkPasswordMatch(e) {
    var el = e.target;
    var password = DOM.signUpForm.password.value;
    if (el.value !== password) {
        DOM.signUpPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.signUpConfirmPassword.classList.add('border-2', 'border-red-500', 'oultine-none');
        DOM.confirmPasswordError.classList.remove('hidden');
        DOM.confirmPasswordError.innerText = 'Passwords do not match!';
    }
    else {
        DOM.signUpPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.signUpConfirmPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.confirmPasswordError.innerText = '';
        DOM.confirmPasswordError.classList.add('hidden');
    }
}
export function retrieveAlbums() {
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
                    albumCollection = albumGrid(albums);
                    if (Array.isArray(albumCollection)) {
                        for (_i = 0, albumCollection_1 = albumCollection; _i < albumCollection_1.length; _i++) {
                            album = albumCollection_1[_i];
                            album.addEventListener('click', toggleAlbumSection);
                            DOM.albumGrid.appendChild(album);
                        }
                    }
                    else
                        DOM.albumGrid.appendChild(albumCollection);
                    sortableGrid(DOM.albumGrid, function () { return updateOrder(); });
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
export function updateOrder() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, album, body, response, error, success, e_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = DOM.albumGrid.children;
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
export function addAlbum(e) {
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
                    body = new FormData(DOM.addAlbumForm);
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
                    if (DOM.albumGrid.childElementCount === 1 && !DOM.albumGrid.firstElementChild.classList.contains('album')) {
                        DOM.albumGrid.removeChild(DOM.albumGrid.firstElementChild);
                    }
                    albumElement = render(albumElem(album));
                    albumElement.addEventListener('click', toggleAlbumSection);
                    DOM.albumGrid.insertBefore(albumElement, DOM.albumGrid.firstElementChild);
                    DOM.addAlbumForm.reset();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    displayError('Something went wrong! ' + error.error);
                    DOM.addAlbumForm.reset();
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_8 = _b.sent();
                    console.log(e_8);
                    displayError("Something went wrong!");
                    DOM.addAlbumForm.reset();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
