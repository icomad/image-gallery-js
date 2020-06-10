import { isLogged } from './utils';
import Index from './components/Index';
import IndexNavbar from './components/IndexNavbar';
import {
	deleteSuccessAlert,
	deleteErrorAlert,
	toggleSignIn,
	toggleSignUp,
	indexSignOut,
	indexGoToDashboard,
	handleSignInPassword,
	handleSignInUsername,
	handleSignUpPasswordConfirm,
	handleSignUpPassword,
	handleSignUpEmail,
	handleSignUpUsername,
	handleSignUpSubmit,
	handleSignInSubmit,
	handleSignInRemember,
} from './actions';

document.addEventListener('DOMContentLoaded', () => {
	if (isLogged()) {
		IndexNavbar.data.isLogged = true;
	}

	document.addEventListener('click', (event: Event) => {
		// ALERTS
		deleteSuccessAlert(event);
		deleteErrorAlert(event);

		// INDEX NAVBAR
		toggleSignIn(event);
		toggleSignUp(event);
		indexSignOut(event);
		indexGoToDashboard(event);
	});

	document.addEventListener('keyup', (event: Event) => {
		// SIGNUP
		handleSignUpUsername(event);
		handleSignUpEmail(event);
		handleSignUpPassword(event);
		handleSignUpPasswordConfirm(event);

		// SIGNIN
		handleSignInUsername(event);
		handleSignInPassword(event);
	});

	document.addEventListener('submit', (event: Event) => {
		handleSignUpSubmit(event);
		handleSignInSubmit(event);
	});

	document.addEventListener('change', (event: Event) => {
		handleSignInRemember(event);
	});

	Index.render();
	IndexNavbar.render();
});
