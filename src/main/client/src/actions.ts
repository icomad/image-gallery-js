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

export function handleSignUpUsername(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#username-signup')) return;

	SignUp.state.username = elem.value;
}

export function handleSignUpEmail(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#email-signup')) return;

	SignUp.state.email = elem.value;
	if (!validateEmail(SignUp.state.email)) SignUp.state.emailError = 'Enter a valid email address!';
	else SignUp.state.emailError = '';
}

export function handleSignUpPassword(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#password-signup')) return;

	SignUp.state.password = elem.value;
	if (SignUp.state.password !== SignUp.state.passwordConfirm) {
		SignUp.state.passwordConfirmError = 'Passwords do not match';
		SignUp.state.passwordError = 'Passwords do not match';
	} else {
		SignUp.state.passwordConfirmError = '';
		SignUp.state.passwordError = '';
	}
}

export function handleSignUpPasswordConfirm(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#confirm-password-signup')) return;

	SignUp.state.passwordConfirm = elem.value;
	if (SignUp.state.password !== SignUp.state.passwordConfirm) {
		SignUp.state.passwordConfirmError = 'Passwords do not match';
		SignUp.state.passwordError = 'Passwords do not match';
	} else {
		SignUp.state.passwordConfirmError = '';
		SignUp.state.passwordError = '';
	}
}

export async function handleSignUpSubmit(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#signup-form')) return;

	e.preventDefault();

	if (IndexNavbar.state.isLogged) return;

	const body = new FormData();
	body.append('username', SignUp.state.username);
	body.append('password', SignUp.state.password);
	body.append('email', SignUp.state.email);
	body.append('passwordCheck', SignUp.state.passwordConfirm);

	try {
		const response = await fetch(`${contextPath}/signup`, { method: 'POST', body });

		switch (response.status) {
			case 200:
				const user = await response.json();
				sessionStorage.setItem('user', JSON.stringify(user));
				SignUp.state.username = '';
				SignUp.state.email = '';
				SignUp.state.password = '';
				SignUp.state.passwordConfirm = '';
				SignUp.state.usernameError = '';
				SignUp.state.emailError = '';
				SignUp.state.passwordError = '';
				SignUp.state.passwordConfirmError = '';
				SignUp.state.genericError = false;
				(document.querySelector('#signup-form') as HTMLFormElement).reset();
				window.location.href = `${contextPath}/app.html`;
				return;
			case 400:
				const error: SignUpResponseError = await response.json();
				SignUp.state.genericError = false;
				if (error.field === 'username') SignUp.state.usernameError = error.error;
				else if (error.field === 'password') SignUp.state.passwordError = error.error;
				else if (error.field === 'email') SignUp.state.emailError = error.error;
				else if (error.field === 'confirmPassword') SignUp.state.passwordConfirmError = error.error;
				return;
			case 401:
			case 500:
				const err: GenericError = await response.json();
				SignUp.state.passwordError = '';
				SignUp.state.usernameError = '';
				SignUp.state.genericError = true;
				ErrorAlert.state.message = err.error;
				Index.state.showError = true;
				Index.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		Index.state.showError = true;
		Index.attach(ErrorAlert);
		console.error(error);
	}
}

/**
 *
 * SIGNIN ACTIONS
 *
 */

export function handleSignInUsername(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#username-signin')) return;

	SignIn.state.username = elem.value;
}

export function handleSignInPassword(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#password-signin')) return;

	SignIn.state.password = elem.value;
}

export function handleSignInRemember(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#remember-signin')) return;

	SignIn.state.remember = elem.checked;
}

export async function handleSignInSubmit(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#signin-form')) return;

	e.preventDefault();

	if (IndexNavbar.state.isLogged) return;

	const body = new FormData();
	body.append('username', SignIn.state.username);
	body.append('password', SignIn.state.password);

	try {
		const response = await fetch(`${contextPath}/signin`, { method: 'POST', body });

		switch (response.status) {
			case 200:
				const user = await response.json();
				sessionStorage.setItem('user', JSON.stringify(user));
				if (SignIn.state.remember) {
					const userWithExpiration = {
						user,
						expiry: new Date().getTime() + 1000 * 60 * 60 * 12,
					};
					localStorage.setItem('user', JSON.stringify(userWithExpiration));
				}
				IndexNavbar.state.isLogged = true;
				SignIn.state.username = '';
				SignIn.state.password = '';
				SignIn.state.usernameError = '';
				SignIn.state.passwordError = '';
				SignIn.state.genericError = false;
				SignIn.state.remember = false;
				(document.querySelector('#signin-form') as HTMLFormElement).reset();
				window.location.href = `${contextPath}/app.html`;
				return;
			case 400:
				const error: SignInResponseError = await response.json();
				SignIn.state.genericError = false;
				if (error.field === 'username') {
					SignIn.state.usernameError = error.error;
				} else if (error.field === 'password') {
					SignIn.state.passwordError = error.error;
				}
				return;
			case 401:
			case 500:
				const err: GenericError = await response.json();
				SignIn.state.passwordError = '';
				SignIn.state.usernameError = '';
				SignIn.state.genericError = true;
				ErrorAlert.state.message = err.error;
				Index.state.showError = true;
				Index.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		Index.state.showError = true;
		Index.attach(ErrorAlert);
		console.error(error);
	}
}

/**
 *
 * INDEX NAVBAR ACTIONS
 *
 */

export function toggleSignIn(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#signin-nav')) return;

	if (IndexNavbar.state.isLogged) return;
	Index.attach(SignIn);
	Index.detach(SignUp);
	Index.state.showIndex = false;
	Index.render();
}

export function toggleSignUp(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#signup-nav')) return;

	if (IndexNavbar.state.isLogged) return;

	Index.attach(SignUp);
	Index.detach(SignIn);
	Index.state.showIndex = false;
	Index.render();
}

export async function indexSignOut(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#signout-btn')) return;

	if (!IndexNavbar.state.isLogged) return;

	try {
		const response = await fetch(`${contextPath}/signout`);

		if (response.status === 200) {
			sessionStorage.removeItem('user');
			localStorage.removeItem('user');
			SuccessAlert.state.message = 'You successfully signed out!';
			Index.state.showSuccess = true;
			Index.attach(SuccessAlert);
			window.location.href = contextPath;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		Index.state.showError = true;
		Index.attach(ErrorAlert);
		console.error(error);
	}
}

export function indexGoToDashboard(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#dashboard-btn')) return;

	if (!IndexNavbar.state.isLogged) return;
	window.location.href = `${contextPath}/app.html`;
}

/**
 *
 * APP NAVBAR ACTIONS
 *
 */

export async function appSignOut(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#signout-btn')) return;

	try {
		const response = await fetch(`${contextPath}/signout`);

		if (response.status === 200) {
			sessionStorage.removeItem('user');
			localStorage.removeItem('user');
			SuccessAlert.state.message = 'You successfully signed out!';
			App.state.showSuccess = true;
			App.attach(SuccessAlert);
			window.location.href = contextPath;
		} else {
			ErrorAlert.state.message = 'Something went wrong!';
			App.state.showError = true;
			App.attach(ErrorAlert);
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		console.error(error);
	}
}

export function appGoToDashboard(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#dashboard-nav')) return;

	App.state.showDashboard = true;
	App.state.showAlbum = false;
	App.state.currentAlbum = null;
}
/**
 *
 * ERROR ALERT ACTIONS
 *
 */

export function deleteErrorAlert(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#error-alert-delete')) return;

	if (!IndexNavbar.state.isLogged && AppNavbar.state.isLogged) {
		App.state.showError = false;
		App.detach(ErrorAlert);
	} else {
		Index.state.showError = false;
		Index.detach(ErrorAlert);
	}
}

/**
 *
 * SUCCESS ALERT ACTIONS
 *
 */

export function deleteSuccessAlert(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#success-alert-delete')) return;

	if (!IndexNavbar.state.isLogged && AppNavbar.state.isLogged) {
		App.state.showSuccess = false;
		App.detach(SuccessAlert);
	} else {
		Index.state.showSuccess = false;
		Index.detach(SuccessAlert);
	}
}

/**
 *
 * ALBUM GRID ACTIONS
 *
 */

export async function retrieveAlbums(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#album-grid') || AlbumGrid.state.attempted) return;

	AlbumGrid.state.attempted = true;
	try {
		const response = await fetch(`${contextPath}/albums`);
		switch (response.status) {
			case 200:
				const albums: Album[] = await response.json();
				AlbumGrid.state.albums = [...albums];
				sortableGrid(document.getElementById('album-grid')!, () => updateOrder());
				return;
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.state.message = 'OPS! Something went wrong! ' + error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		console.error(error);
	}
}

async function updateOrder() {
	// @ts-ignore
	for (const album of document.getElementById('album-grid')!.children) {
		const id = (album as HTMLElement).dataset.id!;
		const newOrder = (album as HTMLElement).dataset.order!;
		const body = new FormData();
		body.append('albumId', id);
		body.append('newOrder', newOrder);
		const alb = AlbumGrid.state.albums.find((album) => album.id === parseInt(id));
		alb!.order = parseInt(newOrder);

		try {
			const response = await fetch(`${contextPath}/albums`, { method: 'PUT', body });
			if (response.status !== 200) {
				const error: GenericError = await response.json();
				ErrorAlert.state.message = 'OPS! Something went wrong! ' + error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				continue;
			}
			const success = await response.json();
		} catch (error) {
			ErrorAlert.state.message = 'Something went wrong! Possible network error!';
			App.state.showError = true;
			App.attach(ErrorAlert);
			console.error(error);
		}
	}
}

export async function openAlbum(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('.album')) return;

	const albumId = parseInt(elem.dataset.id!);
	const album = AlbumGrid.state.albums.find((a) => a.id === albumId);
	let images: Image[];

	try {
		const response = await fetch(`${contextPath}/images?albumId=${albumId}`);
		switch (response.status) {
			case 200:
				images = await response.json();
				const albumDetailComponent = makeAlbumDetailComponent(album!, images);
				App.state.currentAlbum = albumDetailComponent;
				App.state.showDashboard = false;
				App.state.showAlbum = true;
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.state.message = 'Something went wrong! ' + error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		console.error(error);
	}
}

/**
 *
 * ADD ALBUM FORM ACTIONS
 *
 */

export function handleAddAlbumTitle(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-album-title')) return;

	AddAlbumForm.state.albumTitle = elem.value;
}

export async function addAlbum(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#add-album-form')) return;

	e.preventDefault();

	const body = new FormData();
	body.append('title', AddAlbumForm.state.albumTitle);

	try {
		const response = await fetch(`${contextPath}/albums`, { method: 'post', body });
		switch (response.status) {
			case 200:
				const album: Album = await response.json();
				AlbumGrid.state.albums.push(album);
				AddAlbumForm.state.albumTitle = '';
				AddAlbumForm.state.albumTitleError = '';
				AddAlbumForm.state.genericError = false;
				(document.querySelector('#add-album-form') as HTMLFormElement).reset();
				AlbumGrid.render();
				return;
			case 400:
			case 500:
				const error: AlbumResponseError = await response.json();
				AddAlbumForm.state.genericError = true;
				ErrorAlert.state.message = error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		console.error(error);
	}
}

/**
 *
 * ADD IMAGE FORM ACTIONS
 *
 */

export function handleAddImageTitle(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-image-title')) return;

	if (!App.state.currentAlbum || !App.state.currentAlbum.state.imageForm) return;

	App.state.currentAlbum!.state.imageForm!.state.title = elem.value;
}

export function handleAddImageDescription(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-image-description')) return;

	if (!App.state.currentAlbum || !App.state.currentAlbum.state.imageForm) return;

	App.state.currentAlbum!.state.imageForm!.state.description = elem.value;
}

export function handleAddImageFile(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-image-file')) return;

	if (!App.state.currentAlbum || !App.state.currentAlbum.state.imageForm) return;
	if (elem.files === null) return;

	App.state.currentAlbum!.state.imageForm!.state.file = elem.files[0];
}

export async function addImage(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#add-image-form')) return;

	e.preventDefault();
	LoadingModal.state.showModal = true;
	LoadingModal.state.text = 'Uploading image...';
	document.querySelector('body')!.style.pointerEvents = 'none';

	if (!App.state.currentAlbum || !App.state.currentAlbum.state.imageForm) return;
	const form = App.state.currentAlbum.state.imageForm;

	const body = new FormData();
	body.append('albumId', form.state.albumId.toString());
	body.append('title', form.state.title);
	body.append('description', form.state.description);
	body.append('imageFile', form.state.file!, form.state.file?.name);

	try {
		const response = await fetch(`${contextPath}/images`, { method: 'post', body });
		switch (response.status) {
			case 200:
				const image: Image = await response.json();
				App.state.currentAlbum.state.images.push(image);
				App.state.currentAlbum.render();
				form.state.description = '';
				form.state.title = '';
				form.state.file = null;
				(document.querySelector('#add-image-form') as HTMLFormElement).reset();
				LoadingModal.state.showModal = false;
				document.querySelector('body')!.style.pointerEvents = 'auto';
				App.state.currentAlbum.state.imageGrid!.state.page = 1;
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.state.message = 'Something went wrong! ' + error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				LoadingModal.state.showModal = false;
				document.querySelector('body')!.style.pointerEvents = 'auto';
				return;
			default:
				return;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		LoadingModal.state.showModal = false;
		document.querySelector('body')!.style.pointerEvents = 'auto';
		console.error(error);
	}
}

/**
 *
 * IMAGE GRID ACTIONS
 *
 */

export function nextPage(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#next-page-btn')) return;

	if (!App.state.currentAlbum || !App.state.currentAlbum.state.imageGrid) return;

	App.state.currentAlbum.state.imageGrid.state.page += 1;
}

export function prevPage(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#prev-page-btn')) return;

	if (!App.state.currentAlbum || !App.state.currentAlbum.state.imageGrid) return;

	App.state.currentAlbum.state.imageGrid.state.page -= 1;
}

export async function openImage(e: Event) {
	const elem = e.target as HTMLElement;
	if (!('matches' in elem) || !elem.matches('.image')) return;
	const image = App.state.currentAlbum?.state.images.find((img) => img.id === parseInt(elem.dataset.id!));
	if (image === undefined) return;

	let comments: CommentWithUsername[];

	try {
		const response = await fetch(`${contextPath}/comments?imageId=${image.id}`);
		switch (response.status) {
			case 200:
				comments = await response.json();
				const imageDetailComponent = makeImageDetailComponent(image, comments);
				App.state.currentImage = imageDetailComponent;
				App.state.showImage = true;
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.state.message = 'Something went wrong! ' + error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				return;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		console.error(error);
	}
}

/**
 *
 * IMAGE DETAIL ACTIONS
 *
 */

export function closeModal(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#image-detail-modal')) return;

	App.state.showImage = false;
	App.state.currentImage = null;
}

export function handleAddCommentBody(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-comment-body')) return;

	if (!App.state.currentImage) return;

	App.state.currentImage.state.commentBody = elem.value;
}

export function onCommentInputFocus(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-comment-body')) return;
	if (!App.state.currentImage) return;
	if (!App.state.currentImage.state.commentBodyError) return;

	elem.value = '';
	App.state.currentImage.state.commentBodyError = false;
}

export async function addComment(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#add-comment-form')) return;
	if (!App.state.currentImage) return;

	e.preventDefault();

	const imageDetail = App.state.currentImage;
	if (imageDetail.state.commentBody.trim() === '') {
		imageDetail.state.commentBodyError = true;
		const input = document.querySelector('#add-comment-body') as HTMLInputElement;
		input.value = 'You cannot send empty message!';
		return;
	}
	const body = new FormData();
	console.log(imageDetail.state.commentBody);
	body.append('body', imageDetail.state.commentBody);
	body.append('imageId', imageDetail.state.image.id.toString());

	try {
		const response = await fetch(`${contextPath}/comments`, { method: 'post', body });
		switch (response.status) {
			case 200:
				const comment: CommentWithUsername = await response.json();
				imageDetail.state.comments.push(comment);
				imageDetail.render();
				imageDetail.state.commentBody = '';
				(document.querySelector('#add-comment-form') as HTMLFormElement).reset();
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.state.message = 'Something went wrong! ' + error.error;
				App.state.showError = true;
				App.attach(ErrorAlert);
				App.state.showImage = false;
				App.state.currentImage = null;
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.state.message = 'Something went wrong! Possible network error!';
		App.state.showError = true;
		App.attach(ErrorAlert);
		App.state.showImage = false;
		App.state.currentImage = null;
		console.error(error);
	}
}
