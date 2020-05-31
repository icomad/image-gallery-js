(function () {
    'use strict';

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

    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    function validateEmail(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }
    function isLogged() {
        return sessionStorage.getItem("user") !== null;
    }

    var contextPath = '/image-gallery-js';

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
    function toggleSignInSection() {
        if (isLogged()) {
            displayError("You are already signed in!");
            return;
        }
        if (signInSection.classList.contains('hidden')) {
            signUpSection.classList.add('hidden');
            signInSection.classList.remove('hidden');
        }
    }
    function toggleSignUpSection() {
        if (isLogged()) {
            displayError("You are already signed in!");
            return;
        }
        if (signUpSection.classList.contains('hidden')) {
            signInSection.classList.add('hidden');
            signUpSection.classList.remove('hidden');
        }
    }
    function toggleNavbarActiveBtn() {
        signOutBtn.classList.toggle('hidden');
        signInNav.classList.toggle('hidden');
        signUpNav.classList.toggle('hidden');
        dashboardBtn.classList.toggle('hidden');
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
    function signUp(e) {
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
                        body = new FormData(signUpForm);
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
                        signInForm.reset();
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
                        signInForm.reset();
                        return [2 /*return*/];
                    case 9: return [2 /*return*/];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_4 = _b.sent();
                        displayError('Something went wrong! Network error!');
                        signUpForm.reset();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    function signIn(e) {
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
                        body = new FormData(signInForm);
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
                        signInForm.reset();
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
                        signInForm.reset();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    function toggleSignInUsernameError(enable, error) {
        if (error === void 0) { error = null; }
        if (enable && error) {
            signInUsername.classList.add('border-2', 'border-red-500', 'outline-none');
            usernameSignInError.classList.remove('hidden');
            usernameSignInError.innerText = error;
        }
        else {
            signInUsername.classList.remove('border-2', 'border-red-500', 'outline-none');
            usernameSignInError.innerText = '';
            usernameSignInError.classList.add('hidden');
        }
    }
    function toggleSignInPasswordError(enable, error) {
        if (error === void 0) { error = null; }
        if (enable && error) {
            signInPassword.classList.add('border-2', 'border-red-500', 'outline-none');
            passwordSignInError.classList.remove('hidden');
            passwordSignInError.innerText = error;
        }
        else {
            signInPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
            passwordSignInError.innerText = '';
            passwordSignInError.classList.add('hidden');
        }
    }
    function toggleSignUpUsernameError(enable, error) {
        if (error === void 0) { error = null; }
        if (enable && error) {
            signUpUsername.classList.add('border-2', 'border-red-500', 'outline-none');
            usernameSignUpError.classList.remove('hidden');
            usernameSignUpError.innerText = error;
        }
        else {
            signUpUsername.classList.remove('border-2', 'border-red-500', 'outline-none');
            usernameSignUpError.innerText = '';
            usernameSignUpError.classList.add('hidden');
        }
    }
    function toggleSignUpMailError(enable, error) {
        if (error === void 0) { error = null; }
        if (enable && error) {
            signUpEmail.classList.add('border-2', 'border-red-500', 'outline-none');
            emailSignUpError.classList.remove('hidden');
            emailSignUpError.innerText = error;
        }
        else {
            signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
            emailSignUpError.innerText = '';
            emailSignUpError.classList.add('hidden');
        }
    }
    function toggleSignUpPasswordError(enable, error) {
        if (error === void 0) { error = null; }
        if (enable && error) {
            signUpPassword.classList.add('border-2', 'border-red-500', 'outline-none');
            passwordSignUpError.classList.remove('hidden');
            passwordSignUpError.innerText = error;
        }
        else {
            signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
            passwordSignUpError.innerText = '';
            passwordSignUpError.classList.add('hidden');
        }
    }
    function toggleSignUpPasswordCheckError(enable, error) {
        if (error === void 0) { error = null; }
        if (enable && error) {
            signUpConfirmPassword.classList.add('border-2', 'border-red-500', 'outline-none');
            confirmPasswordError.classList.remove('hidden');
            confirmPasswordError.innerText = error;
        }
        else {
            signUpConfirmPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
            confirmPasswordError.innerText = '';
            confirmPasswordError.classList.add('hidden');
        }
    }
    function checkEmailValidity(e) {
        var el = e.target;
        if (!validateEmail(el.value)) {
            signUpEmail.classList.add('border-2', 'border-red-500', 'outline-none');
            emailSignUpError.classList.remove('hidden');
            emailSignUpError.innerText = 'Enter a valid email!';
        }
        else {
            signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
            emailSignUpError.innerText = '';
            emailSignUpError.classList.add('hidden');
        }
    }
    function checkPasswordMatch(e) {
        var el = e.target;
        var password = signUpForm.password.value;
        if (el.value !== password) {
            signUpPassword.classList.add('border-2', 'border-red-500', 'outline-none');
            signUpConfirmPassword.classList.add('border-2', 'border-red-500', 'oultine-none');
            confirmPasswordError.classList.remove('hidden');
            confirmPasswordError.innerText = 'Passwords do not match!';
        }
        else {
            signUpPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
            signUpConfirmPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
            confirmPasswordError.innerText = '';
            confirmPasswordError.classList.add('hidden');
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        enableDeleteAlert();
        if (isLogged()) {
            toggleNavbarActiveBtn();
            signOutBtn.addEventListener('click', signOut);
            dashboardBtn.addEventListener('click', function () { return window.location.href = contextPath + "/app.html"; });
        }
        else {
            signInNav.addEventListener('click', toggleSignInSection);
            signUpNav.addEventListener('click', toggleSignUpSection);
            signUpEmail.addEventListener('keyup', checkEmailValidity);
            signUpConfirmPassword.addEventListener('keyup', checkPasswordMatch);
            signUpForm.addEventListener('submit', signUp);
            signInForm.addEventListener('submit', signIn);
            signInUsername.addEventListener('focus', function () { return toggleSignInUsernameError(false); });
            signInPassword.addEventListener('focus', function () { return toggleSignInPasswordError(false); });
            signUpUsername.addEventListener('focus', function () { return toggleSignUpUsernameError(false); });
            signUpEmail.addEventListener('focus', function () { return toggleSignUpMailError(false); });
            signUpPassword.addEventListener('focus', function () { return toggleSignUpPasswordError(false); });
            signUpConfirmPassword.addEventListener('focus', function () { return toggleSignUpPasswordCheckError(false); });
        }
        homeBtn.addEventListener('click', goBackHome);
    });

}());
