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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import AlbumGrid from './components/AlbumGrid';
import { contextPath, sortableGrid, validateEmail } from './utils';
import ErrorAlert from './components/ErrorAlert';
import App from './components/App';
import IndexNavbar from './components/IndexNavbar';
import SuccessAlert from './components/SuccessAlert';
import AppNavbar from './components/AppNavbar';
import Index from './components/Index';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddAlbumForm from './components/AddAlbumForm';
import makeAlbumDetailComponent from './components/AlbumDetail';
import LoadingModal from './components/LoadingModal';
import makeImageDetailComponent from './components/ImageDetail';
/**
 *
 * SIGNUP ACTIONS
 *
 */
export function handleSignUpUsername(e) {
    var elem = e.target;
    if (!elem.matches('#username-signup'))
        return;
    SignUp.data.username = elem.value;
}
export function handleSignUpEmail(e) {
    var elem = e.target;
    if (!elem.matches('#email-signup'))
        return;
    SignUp.data.email = elem.value;
    if (!validateEmail(SignUp.data.email))
        SignUp.data.emailError = 'Enter a valid email address!';
    else
        SignUp.data.emailError = '';
}
export function handleSignUpPassword(e) {
    var elem = e.target;
    if (!elem.matches('#password-signup'))
        return;
    SignUp.data.password = elem.value;
    if (SignUp.data.password !== SignUp.data.passwordConfirm) {
        SignUp.data.passwordConfirmError = 'Passwords do not match';
        SignUp.data.passwordError = 'Passwords do not match';
    }
    else {
        SignUp.data.passwordConfirmError = '';
        SignUp.data.passwordError = '';
    }
}
export function handleSignUpPasswordConfirm(e) {
    var elem = e.target;
    if (!elem.matches('#confirm-password-signup'))
        return;
    SignUp.data.passwordConfirm = elem.value;
    if (SignUp.data.password !== SignUp.data.passwordConfirm) {
        SignUp.data.passwordConfirmError = 'Passwords do not match';
        SignUp.data.passwordError = 'Passwords do not match';
    }
    else {
        SignUp.data.passwordConfirmError = '';
        SignUp.data.passwordError = '';
    }
}
export function handleSignUpSubmit(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, body, response, _a, user, error, err, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#signup-form'))
                        return [2 /*return*/];
                    e.preventDefault();
                    if (IndexNavbar.data.isLogged)
                        return [2 /*return*/];
                    body = new FormData();
                    body.append('username', SignUp.data.username);
                    body.append('password', SignUp.data.password);
                    body.append('email', SignUp.data.email);
                    body.append('passwordCheck', SignUp.data.passwordConfirm);
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
                        case 401: return [3 /*break*/, 7];
                        case 500: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    user = _b.sent();
                    sessionStorage.setItem('user', JSON.stringify(user));
                    SignUp.data.username = '';
                    SignUp.data.email = '';
                    SignUp.data.password = '';
                    SignUp.data.passwordConfirm = '';
                    SignUp.data.usernameError = '';
                    SignUp.data.emailError = '';
                    SignUp.data.passwordError = '';
                    SignUp.data.passwordConfirmError = '';
                    SignUp.data.genericError = false;
                    document.querySelector('#signup-form').reset();
                    window.location.href = contextPath + "/app.html";
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    SignUp.data.genericError = false;
                    if (error.field === 'username')
                        SignUp.data.usernameError = error.error;
                    else if (error.field === 'password')
                        SignUp.data.passwordError = error.error;
                    else if (error.field === 'email')
                        SignUp.data.emailError = error.error;
                    else if (error.field === 'confirmPassword')
                        SignUp.data.passwordConfirmError = error.error;
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, response.json()];
                case 8:
                    err = _b.sent();
                    SignUp.data.passwordError = '';
                    SignUp.data.usernameError = '';
                    SignUp.data.genericError = true;
                    ErrorAlert.data.message = err.error;
                    Index.data.showError = true;
                    Index.attach(ErrorAlert);
                    return [2 /*return*/];
                case 9: return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_1 = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    Index.data.showError = true;
                    Index.attach(ErrorAlert);
                    console.error(error_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
/**
 *
 * SIGNIN ACTIONS
 *
 */
export function handleSignInUsername(e) {
    var elem = e.target;
    if (!elem.matches('#username-signin'))
        return;
    SignIn.data.username = elem.value;
}
export function handleSignInPassword(e) {
    var elem = e.target;
    if (!elem.matches('#password-signin'))
        return;
    SignIn.data.password = elem.value;
}
export function handleSignInRemember(e) {
    var elem = e.target;
    if (!elem.matches('#remember-signin'))
        return;
    SignIn.data.remember = elem.checked;
}
export function handleSignInSubmit(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, body, response, _a, user, userWithExpiration, error, err, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#signin-form'))
                        return [2 /*return*/];
                    e.preventDefault();
                    if (IndexNavbar.data.isLogged)
                        return [2 /*return*/];
                    body = new FormData();
                    body.append('username', SignIn.data.username);
                    body.append('password', SignIn.data.password);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, fetch(contextPath + "/signin", { method: 'POST', body: body })];
                case 2:
                    response = _b.sent();
                    _a = response.status;
                    switch (_a) {
                        case 200: return [3 /*break*/, 3];
                        case 400: return [3 /*break*/, 5];
                        case 401: return [3 /*break*/, 7];
                        case 500: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    user = _b.sent();
                    sessionStorage.setItem('user', JSON.stringify(user));
                    if (SignIn.data.remember) {
                        userWithExpiration = {
                            user: user,
                            expiry: new Date().getTime() + 1000 * 60 * 60 * 12,
                        };
                        localStorage.setItem('user', JSON.stringify(userWithExpiration));
                    }
                    IndexNavbar.data.isLogged = true;
                    SignIn.data.username = '';
                    SignIn.data.password = '';
                    SignIn.data.usernameError = '';
                    SignIn.data.passwordError = '';
                    SignIn.data.genericError = false;
                    SignIn.data.remember = false;
                    document.querySelector('#signin-form').reset();
                    window.location.href = contextPath + "/app.html";
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    SignIn.data.genericError = false;
                    if (error.field === 'username') {
                        SignIn.data.usernameError = error.error;
                    }
                    else if (error.field === 'password') {
                        SignIn.data.passwordError = error.error;
                    }
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, response.json()];
                case 8:
                    err = _b.sent();
                    SignIn.data.passwordError = '';
                    SignIn.data.usernameError = '';
                    SignIn.data.genericError = true;
                    ErrorAlert.data.message = err.error;
                    Index.data.showError = true;
                    Index.attach(ErrorAlert);
                    return [2 /*return*/];
                case 9: return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_2 = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    Index.data.showError = true;
                    Index.attach(ErrorAlert);
                    console.error(error_2);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
/**
 *
 * INDEX NAVBAR ACTIONS
 *
 */
export function toggleSignIn(e) {
    var elem = e.target;
    if (!elem.matches('#signin-nav'))
        return;
    if (IndexNavbar.data.isLogged)
        return;
    Index.attach(SignIn);
    Index.detach(SignUp);
    Index.data.showIndex = false;
    Index.render();
}
export function toggleSignUp(e) {
    var elem = e.target;
    if (!elem.matches('#signup-nav'))
        return;
    if (IndexNavbar.data.isLogged)
        return;
    Index.attach(SignUp);
    Index.detach(SignIn);
    Index.data.showIndex = false;
    Index.render();
}
export function indexSignOut(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#signout-btn'))
                        return [2 /*return*/];
                    if (!IndexNavbar.data.isLogged)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(contextPath + "/signout")];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        sessionStorage.removeItem('user');
                        localStorage.removeItem('user');
                        SuccessAlert.data.message = 'You successfully signed out!';
                        Index.data.showSuccess = true;
                        Index.attach(SuccessAlert);
                        window.location.href = contextPath;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    Index.data.showError = true;
                    Index.attach(ErrorAlert);
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function indexGoToDashboard(e) {
    var elem = e.target;
    if (!elem.matches('#dashboard-btn'))
        return;
    if (!IndexNavbar.data.isLogged)
        return;
    window.location.href = contextPath + "/app.html";
}
/**
 *
 * APP NAVBAR ACTIONS
 *
 */
export function appSignOut(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#signout-btn'))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(contextPath + "/signout")];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        sessionStorage.removeItem('user');
                        localStorage.removeItem('user');
                        SuccessAlert.data.message = 'You successfully signed out!';
                        App.data.showSuccess = true;
                        App.attach(SuccessAlert);
                        window.location.href = contextPath;
                    }
                    else {
                        ErrorAlert.data.message = 'Something went wrong!';
                        App.data.showError = true;
                        App.attach(ErrorAlert);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function appGoToDashboard(e) {
    var elem = e.target;
    if (!elem.matches('#dashboard-nav'))
        return;
    App.data.showDashboard = true;
    App.data.showAlbum = false;
    App.data.currentAlbum = null;
}
/**
 *
 * ERROR ALERT ACTIONS
 *
 */
export function deleteErrorAlert(e) {
    var elem = e.target;
    if (!elem.matches('#error-alert-delete'))
        return;
    if (!IndexNavbar.data.isLogged && AppNavbar.data.isLogged) {
        App.data.showError = false;
        App.detach(ErrorAlert);
    }
    else {
        Index.data.showError = false;
        Index.detach(ErrorAlert);
    }
}
/**
 *
 * SUCCESS ALERT ACTIONS
 *
 */
export function deleteSuccessAlert(e) {
    var elem = e.target;
    if (!elem.matches('#success-alert-delete'))
        return;
    if (!IndexNavbar.data.isLogged && AppNavbar.data.isLogged) {
        App.data.showSuccess = false;
        App.detach(SuccessAlert);
    }
    else {
        Index.data.showSuccess = false;
        Index.detach(SuccessAlert);
    }
}
/**
 *
 * ALBUM GRID ACTIONS
 *
 */
export function retrieveAlbums(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, response, _a, albums, error, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#album-grid') || AlbumGrid.data.attempted)
                        return [2 /*return*/];
                    AlbumGrid.data.attempted = true;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch(contextPath + "/albums")];
                case 2:
                    response = _b.sent();
                    _a = response.status;
                    switch (_a) {
                        case 200: return [3 /*break*/, 3];
                        case 500: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    albums = _b.sent();
                    AlbumGrid.data.albums = __spread(albums);
                    sortableGrid(document.getElementById('album-grid'), function () { return updateOrder(); });
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    ErrorAlert.data.message = 'OPS! Something went wrong! ' + error.error;
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    return [2 /*return*/];
                case 7: return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_5 = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    console.error(error_5);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function updateOrder() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _a, _b, album, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _loop_1 = function (album) {
                        var id, newOrder, body, alb, response, error, success, error_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = album.dataset.id;
                                    newOrder = album.dataset.order;
                                    body = new FormData();
                                    body.append('albumId', id);
                                    body.append('newOrder', newOrder);
                                    alb = AlbumGrid.data.albums.find(function (album) { return album.id === parseInt(id); });
                                    alb.order = parseInt(newOrder);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 6, , 7]);
                                    return [4 /*yield*/, fetch(contextPath + "/albums", { method: 'PUT', body: body })];
                                case 2:
                                    response = _a.sent();
                                    if (!(response.status !== 200)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, response.json()];
                                case 3:
                                    error = _a.sent();
                                    ErrorAlert.data.message = 'OPS! Something went wrong! ' + error.error;
                                    App.data.showError = true;
                                    App.attach(ErrorAlert);
                                    return [2 /*return*/, "continue"];
                                case 4: return [4 /*yield*/, response.json()];
                                case 5:
                                    success = _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    error_6 = _a.sent();
                                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                                    App.data.showError = true;
                                    App.attach(ErrorAlert);
                                    console.error(error_6);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    };
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    _a = __values(document.getElementById('album-grid').children), _b = _a.next();
                    _d.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    album = _b.value;
                    return [5 /*yield**/, _loop_1(album)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function openAlbum(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, albumId, album, images, response, _a, albumDetailComponent, error, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('.album'))
                        return [2 /*return*/];
                    albumId = parseInt(elem.dataset.id);
                    album = AlbumGrid.data.albums.find(function (a) { return a.id === albumId; });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch(contextPath + "/images?albumId=" + albumId)];
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
                    images = _b.sent();
                    albumDetailComponent = makeAlbumDetailComponent(album, images);
                    App.data.currentAlbum = albumDetailComponent;
                    App.data.showDashboard = false;
                    App.data.showAlbum = true;
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    return [2 /*return*/];
                case 7: return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_7 = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    console.error(error_7);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
/**
 *
 * ADD ALBUM FORM ACTIONS
 *
 */
export function handleAddAlbumTitle(e) {
    var elem = e.target;
    if (!elem.matches('#add-album-title'))
        return;
    AddAlbumForm.data.albumTitle = elem.value;
}
export function addAlbum(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, body, response, _a, album, error, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#add-album-form'))
                        return [2 /*return*/];
                    e.preventDefault();
                    body = new FormData();
                    body.append('title', AddAlbumForm.data.albumTitle);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch(contextPath + "/albums", { method: 'post', body: body })];
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
                    AlbumGrid.data.albums.push(album);
                    AddAlbumForm.data.albumTitle = '';
                    AddAlbumForm.data.albumTitleError = '';
                    AddAlbumForm.data.genericError = false;
                    document.querySelector('#add-album-form').reset();
                    AlbumGrid.render();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    AddAlbumForm.data.genericError = true;
                    ErrorAlert.data.message = error.error;
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    return [2 /*return*/];
                case 7: return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_8 = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    console.error(error_8);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
/**
 *
 * ADD IMAGE FORM ACTIONS
 *
 */
export function handleAddImageTitle(e) {
    var elem = e.target;
    if (!elem.matches('#add-image-title'))
        return;
    if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
        return;
    App.data.currentAlbum.data.imageForm.data.title = elem.value;
}
export function handleAddImageDescription(e) {
    var elem = e.target;
    if (!elem.matches('#add-image-description'))
        return;
    if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
        return;
    App.data.currentAlbum.data.imageForm.data.description = elem.value;
}
export function handleAddImageFile(e) {
    var elem = e.target;
    if (!elem.matches('#add-image-file'))
        return;
    if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
        return;
    if (elem.files === null)
        return;
    App.data.currentAlbum.data.imageForm.data.file = elem.files[0];
}
export function addImage(e) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var elem, form, body, response, _b, image, error, error_9;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#add-image-form'))
                        return [2 /*return*/];
                    e.preventDefault();
                    LoadingModal.data.showModal = true;
                    LoadingModal.data.text = 'Uploading image...';
                    document.querySelector('body').style.pointerEvents = 'none';
                    if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm)
                        return [2 /*return*/];
                    form = App.data.currentAlbum.data.imageForm;
                    body = new FormData();
                    body.append('albumId', form.data.albumId.toString());
                    body.append('title', form.data.title);
                    body.append('description', form.data.description);
                    body.append('imageFile', form.data.file, (_a = form.data.file) === null || _a === void 0 ? void 0 : _a.name);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch(contextPath + "/images", { method: 'post', body: body })];
                case 2:
                    response = _c.sent();
                    _b = response.status;
                    switch (_b) {
                        case 200: return [3 /*break*/, 3];
                        case 400: return [3 /*break*/, 5];
                        case 500: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    image = _c.sent();
                    App.data.currentAlbum.data.images.push(image);
                    App.data.currentAlbum.render();
                    form.data.description = '';
                    form.data.title = '';
                    form.data.file = null;
                    document.querySelector('#add-image-form').reset();
                    LoadingModal.data.showModal = false;
                    document.querySelector('body').style.pointerEvents = 'auto';
                    App.data.currentAlbum.data.imageGrid.data.page = 1;
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _c.sent();
                    ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    LoadingModal.data.showModal = false;
                    document.querySelector('body').style.pointerEvents = 'auto';
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_9 = _c.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    LoadingModal.data.showModal = false;
                    document.querySelector('body').style.pointerEvents = 'auto';
                    console.error(error_9);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
/**
 *
 * IMAGE GRID ACTIONS
 *
 */
export function nextPage(e) {
    var elem = e.target;
    if (!elem.matches('#next-page-btn'))
        return;
    if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageGrid)
        return;
    App.data.currentAlbum.data.imageGrid.data.page += 1;
}
export function prevPage(e) {
    var elem = e.target;
    if (!elem.matches('#prev-page-btn'))
        return;
    if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageGrid)
        return;
    App.data.currentAlbum.data.imageGrid.data.page -= 1;
}
export function openImage(e) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var elem, image, comments, response, _b, imageDetailComponent, error, error_10;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    elem = e.target;
                    if (!('matches' in elem) || !elem.matches('.image'))
                        return [2 /*return*/];
                    image = (_a = App.data.currentAlbum) === null || _a === void 0 ? void 0 : _a.data.images.find(function (img) { return img.id === parseInt(elem.dataset.id); });
                    if (image === undefined)
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch(contextPath + "/comments?imageId=" + image.id)];
                case 2:
                    response = _c.sent();
                    _b = response.status;
                    switch (_b) {
                        case 200: return [3 /*break*/, 3];
                        case 400: return [3 /*break*/, 5];
                        case 500: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    comments = _c.sent();
                    imageDetailComponent = makeImageDetailComponent(image, comments);
                    App.data.currentImage = imageDetailComponent;
                    App.data.showImage = true;
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _c.sent();
                    ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    return [2 /*return*/];
                case 7: return [2 /*return*/];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_10 = _c.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    console.error(error_10);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
/**
 *
 * IMAGE DETAIL ACTIONS
 *
 */
export function closeModal(e) {
    var elem = e.target;
    if (!elem.matches('#image-detail-modal'))
        return;
    App.data.showImage = false;
    App.data.currentImage = null;
}
export function handleAddCommentBody(e) {
    var elem = e.target;
    if (!elem.matches('#add-comment-body'))
        return;
    if (!App.data.currentImage)
        return;
    App.data.currentImage.data.commentBody = elem.value;
}
export function onCommentInputFocus(e) {
    var elem = e.target;
    if (!elem.matches('#add-comment-body'))
        return;
    if (!App.data.currentImage)
        return;
    if (!App.data.currentImage.data.commentBodyError)
        return;
    elem.value = '';
    App.data.currentImage.data.commentBodyError = false;
}
export function addComment(e) {
    return __awaiter(this, void 0, void 0, function () {
        var elem, imageDetail, input, body, response, _a, comment, error, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    elem = e.target;
                    if (!elem.matches('#add-comment-form'))
                        return [2 /*return*/];
                    if (!App.data.currentImage)
                        return [2 /*return*/];
                    e.preventDefault();
                    imageDetail = App.data.currentImage;
                    if (imageDetail.data.commentBody.trim() === '') {
                        imageDetail.data.commentBodyError = true;
                        input = document.querySelector('#add-comment-body');
                        input.value = 'You cannot send empty message!';
                        return [2 /*return*/];
                    }
                    body = new FormData();
                    console.log(imageDetail.data.commentBody);
                    body.append('body', imageDetail.data.commentBody);
                    body.append('imageId', imageDetail.data.image.id.toString());
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fetch(contextPath + "/comments", { method: 'post', body: body })];
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
                    comment = _b.sent();
                    imageDetail.data.comments.push(comment);
                    imageDetail.render();
                    imageDetail.data.commentBody = '';
                    document.querySelector('#add-comment-form').reset();
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, response.json()];
                case 6:
                    error = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! ' + error.error;
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    App.data.showImage = false;
                    App.data.currentImage = null;
                    return [2 /*return*/];
                case 7: return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_11 = _b.sent();
                    ErrorAlert.data.message = 'Something went wrong! Possible network error!';
                    App.data.showError = true;
                    App.attach(ErrorAlert);
                    App.data.showImage = false;
                    App.data.currentImage = null;
                    console.error(error_11);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
