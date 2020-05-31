import * as DOM from './elements';
import * as Action from './actions';
import { isLogged } from "./utils";
import { contextPath } from "./constants";
document.addEventListener("DOMContentLoaded", function () {
    Action.enableDeleteAlert();
    if (isLogged()) {
        Action.toggleNavbarActiveBtn();
        DOM.signOutBtn.addEventListener('click', Action.signOut);
        DOM.dashboardBtn.addEventListener('click', function () { return window.location.href = contextPath + "/app.html"; });
    }
    else {
        DOM.signInNav.addEventListener('click', Action.toggleSignInSection);
        DOM.signUpNav.addEventListener('click', Action.toggleSignUpSection);
        DOM.signUpEmail.addEventListener('keyup', Action.checkEmailValidity);
        DOM.signUpConfirmPassword.addEventListener('keyup', Action.checkPasswordMatch);
        DOM.signUpForm.addEventListener('submit', Action.signUp);
        DOM.signInForm.addEventListener('submit', Action.signIn);
        DOM.signInUsername.addEventListener('focus', function () { return Action.toggleSignInUsernameError(false); });
        DOM.signInPassword.addEventListener('focus', function () { return Action.toggleSignInPasswordError(false); });
        DOM.signUpUsername.addEventListener('focus', function () { return Action.toggleSignUpUsernameError(false); });
        DOM.signUpEmail.addEventListener('focus', function () { return Action.toggleSignUpMailError(false); });
        DOM.signUpPassword.addEventListener('focus', function () { return Action.toggleSignUpPasswordError(false); });
        DOM.signUpConfirmPassword.addEventListener('focus', function () { return Action.toggleSignUpPasswordCheckError(false); });
    }
    DOM.homeBtn.addEventListener('click', Action.goBackHome);
});
