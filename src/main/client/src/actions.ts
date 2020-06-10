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

	SignUp.data.username = elem.value;
}

export function handleSignUpEmail(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#email-signup')) return;

	SignUp.data.email = elem.value;
	if (!validateEmail(SignUp.data.email)) SignUp.data.emailError = 'Enter a valid email address!';
	else SignUp.data.emailError = '';
}

export function handleSignUpPassword(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#password-signup')) return;

	SignUp.data.password = elem.value;
	if (SignUp.data.password !== SignUp.data.passwordConfirm) {
		SignUp.data.passwordConfirmError = 'Passwords do not match';
		SignUp.data.passwordError = 'Passwords do not match';
	} else {
		SignUp.data.passwordConfirmError = '';
		SignUp.data.passwordError = '';
	}
}

export function handleSignUpPasswordConfirm(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#confirm-password-signup')) return;

	SignUp.data.passwordConfirm = elem.value;
	if (SignUp.data.password !== SignUp.data.passwordConfirm) {
		SignUp.data.passwordConfirmError = 'Passwords do not match';
		SignUp.data.passwordError = 'Passwords do not match';
	} else {
		SignUp.data.passwordConfirmError = '';
		SignUp.data.passwordError = '';
	}
}

export async function handleSignUpSubmit(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#signup-form')) return;

	e.preventDefault();

	if (IndexNavbar.data.isLogged) return;

	const body = new FormData();
	body.append('username', SignUp.data.username);
	body.append('password', SignUp.data.password);
	body.append('email', SignUp.data.email);
	body.append('passwordCheck', SignUp.data.passwordConfirm);

	try {
		const response = await fetch(`${contextPath}/signup`, { method: 'POST', body });

		switch (response.status) {
			case 200:
				const user = await response.json();
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
				(document.querySelector('#signup-form') as HTMLFormElement).reset();
				window.location.href = `${contextPath}/app.html`;
				return;
			case 400:
				const error: SignUpResponseError = await response.json();
				SignUp.data.genericError = false;
				if (error.field === 'username') SignUp.data.usernameError = error.error;
				else if (error.field === 'password') SignUp.data.passwordError = error.error;
				else if (error.field === 'email') SignUp.data.emailError = error.error;
				else if (error.field === 'confirmPassword') SignUp.data.passwordConfirmError = error.error;
				return;
			case 401:
			case 500:
				const err: GenericError = await response.json();
				SignUp.data.passwordError = '';
				SignUp.data.usernameError = '';
				SignUp.data.genericError = true;
				ErrorAlert.data.message = err.error;
				Index.data.showError = true;
				Index.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		Index.data.showError = true;
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

	SignIn.data.username = elem.value;
}

export function handleSignInPassword(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#password-signin')) return;

	SignIn.data.password = elem.value;
}

export function handleSignInRemember(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#remember-signin')) return;

	SignIn.data.remember = elem.checked;
}

export async function handleSignInSubmit(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#signin-form')) return;

	e.preventDefault();

	if (IndexNavbar.data.isLogged) return;

	const body = new FormData();
	body.append('username', SignIn.data.username);
	body.append('password', SignIn.data.password);

	try {
		const response = await fetch(`${contextPath}/signin`, { method: 'POST', body });

		switch (response.status) {
			case 200:
				const user = await response.json();
				sessionStorage.setItem('user', JSON.stringify(user));
				if (SignIn.data.remember) {
					const userWithExpiration = {
						user,
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
				(document.querySelector('#signin-form') as HTMLFormElement).reset();
				window.location.href = `${contextPath}/app.html`;
				return;
			case 400:
				const error: SignInResponseError = await response.json();
				SignIn.data.genericError = false;
				if (error.field === 'username') {
					SignIn.data.usernameError = error.error;
				} else if (error.field === 'password') {
					SignIn.data.passwordError = error.error;
				}
				return;
			case 401:
			case 500:
				const err: GenericError = await response.json();
				SignIn.data.passwordError = '';
				SignIn.data.usernameError = '';
				SignIn.data.genericError = true;
				ErrorAlert.data.message = err.error;
				Index.data.showError = true;
				Index.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		Index.data.showError = true;
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

	if (IndexNavbar.data.isLogged) return;
	Index.attach(SignIn);
	Index.detach(SignUp);
	Index.render();
}

export function toggleSignUp(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#signup-nav')) return;

	if (IndexNavbar.data.isLogged) return;

	Index.attach(SignUp);
	Index.detach(SignIn);
	Index.render();
}

export async function indexSignOut(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#signout-btn')) return;

	if (!IndexNavbar.data.isLogged) return;

	try {
		const response = await fetch(`${contextPath}/signout`);

		if (response.status === 200) {
			sessionStorage.removeItem('user');
			localStorage.removeItem('user');
			SuccessAlert.data.message = 'You successfully signed out!';
			Index.data.showSuccess = true;
			Index.attach(SuccessAlert);
			window.location.href = contextPath;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		Index.data.showError = true;
		Index.attach(ErrorAlert);
		console.error(error);
	}
}

export function indexGoToDashboard(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#dashboard-btn')) return;

	if (!IndexNavbar.data.isLogged) return;
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
			SuccessAlert.data.message = 'You successfully signed out!';
			App.data.showSuccess = true;
			App.attach(SuccessAlert);
			window.location.href = contextPath;
		} else {
			ErrorAlert.data.message = 'Something went wrong!';
			App.data.showError = true;
			App.attach(ErrorAlert);
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
		App.attach(ErrorAlert);
		console.error(error);
	}
}

export function appGoToDashboard(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#dashboard-nav')) return;

	App.data.showDashboard = true;
	App.data.showAlbum = false;
	App.data.currentAlbum = null;
}
/**
 *
 * ERROR ALERT ACTIONS
 *
 */

export function deleteErrorAlert(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#error-alert-delete')) return;

	if (!IndexNavbar.data.isLogged && AppNavbar.data.isLogged) {
		App.data.showError = false;
		App.detach(ErrorAlert);
	} else {
		Index.data.showError = false;
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

	if (!IndexNavbar.data.isLogged && AppNavbar.data.isLogged) {
		App.data.showSuccess = false;
		App.detach(SuccessAlert);
	} else {
		Index.data.showSuccess = false;
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
	if (!elem.matches('#album-grid') || AlbumGrid.data.attempted) return;

	AlbumGrid.data.attempted = true;
	try {
		const response = await fetch(`${contextPath}/albums`);
		switch (response.status) {
			case 200:
				const albums: Album[] = await response.json();
				AlbumGrid.data.albums = [...albums];
				sortableGrid(document.getElementById('album-grid')!, () => updateOrder());
				return;
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.data.message = 'OPS! Something went wrong! ' + error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
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
		const alb = AlbumGrid.data.albums.find((album) => album.id === parseInt(id));
		alb!.order = parseInt(newOrder);

		try {
			const response = await fetch(`${contextPath}/albums`, { method: 'PUT', body });
			if (response.status !== 200) {
				const error: GenericError = await response.json();
				ErrorAlert.data.message = 'OPS! Something went wrong! ' + error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				continue;
			}
			const success = await response.json();
		} catch (error) {
			ErrorAlert.data.message = 'Something went wrong! Possible network error!';
			App.data.showError = true;
			App.attach(ErrorAlert);
			console.error(error);
		}
	}
}

export async function openAlbum(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('.album')) return;

	const albumId = parseInt(elem.dataset.id!);
	const album = AlbumGrid.data.albums.find((a) => a.id === albumId);
	let images: Image[];

	try {
		const response = await fetch(`${contextPath}/images?albumId=${albumId}`);
		switch (response.status) {
			case 200:
				images = await response.json();
				const albumDetailComponent = makeAlbumDetailComponent(album!, images);
				App.data.currentAlbum = albumDetailComponent;
				App.data.showDashboard = false;
				App.data.showAlbum = true;
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.data.message = 'Something went wrong! ' + error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
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

	AddAlbumForm.data.albumTitle = elem.value;
}

export async function addAlbum(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#add-album-form')) return;

	e.preventDefault();

	const body = new FormData();
	body.append('title', AddAlbumForm.data.albumTitle);

	try {
		const response = await fetch(`${contextPath}/albums`, { method: 'post', body });
		switch (response.status) {
			case 200:
				const album: Album = await response.json();
				AlbumGrid.data.albums.push(album);
				AddAlbumForm.data.albumTitle = '';
				AddAlbumForm.data.albumTitleError = '';
				AddAlbumForm.data.genericError = false;
				(document.querySelector('#add-album-form') as HTMLFormElement).reset();
				AlbumGrid.render();
				return;
			case 400:
			case 500:
				const error: AlbumResponseError = await response.json();
				AddAlbumForm.data.genericError = true;
				ErrorAlert.data.message = error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
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

	if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm) return;

	App.data.currentAlbum!.data.imageForm!.data.title = elem.value;
}

export function handleAddImageDescription(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-image-description')) return;

	if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm) return;

	App.data.currentAlbum!.data.imageForm!.data.description = elem.value;
}

export function handleAddImageFile(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-image-file')) return;

	if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm) return;
	if (elem.files === null) return;

	App.data.currentAlbum!.data.imageForm!.data.file = elem.files[0];
}

export async function addImage(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#add-image-form')) return;

	e.preventDefault();
	LoadingModal.data.showModal = true;
	LoadingModal.data.text = 'Uploading image...';
	document.querySelector('body')!.style.pointerEvents = 'none';

	if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageForm) return;
	const form = App.data.currentAlbum.data.imageForm;

	const body = new FormData();
	body.append('albumId', form.data.albumId.toString());
	body.append('title', form.data.title);
	body.append('description', form.data.description);
	body.append('imageFile', form.data.file!, form.data.file?.name);

	try {
		const response = await fetch(`${contextPath}/images`, { method: 'post', body });
		switch (response.status) {
			case 200:
				const image: Image = await response.json();
				App.data.currentAlbum.data.images.push(image);
				App.data.currentAlbum.render();
				form.data.description = '';
				form.data.title = '';
				form.data.file = null;
				(document.querySelector('#add-image-form') as HTMLFormElement).reset();
				LoadingModal.data.showModal = false;
				document.querySelector('body')!.style.pointerEvents = 'auto';
				App.data.currentAlbum.data.imageGrid!.data.page = 1;
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.data.message = 'Something went wrong! ' + error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				LoadingModal.data.showModal = false;
				document.querySelector('body')!.style.pointerEvents = 'auto';
				return;
			default:
				return;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
		App.attach(ErrorAlert);
		LoadingModal.data.showModal = false;
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

	if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageGrid) return;

	App.data.currentAlbum.data.imageGrid.data.page += 1;
}

export function prevPage(e: Event) {
	const elem = e.target as HTMLElement;
	if (!elem.matches('#prev-page-btn')) return;

	if (!App.data.currentAlbum || !App.data.currentAlbum.data.imageGrid) return;

	App.data.currentAlbum.data.imageGrid.data.page -= 1;
}

export async function openImage(e: Event) {
	const elem = e.target as HTMLElement;
	if (!('matches' in elem) || !elem.matches('.image')) return;
	const image = App.data.currentAlbum?.data.images.find((img) => img.id === parseInt(elem.dataset.id!));
	if (image === undefined) return;

	let comments: CommentWithUsername[];

	try {
		const response = await fetch(`${contextPath}/comments?imageId=${image.id}`);
		switch (response.status) {
			case 200:
				comments = await response.json();
				const imageDetailComponent = makeImageDetailComponent(image, comments);
				App.data.currentImage = imageDetailComponent;
				App.data.showImage = true;
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.data.message = 'Something went wrong! ' + error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				return;
			default:
				return;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
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

	App.data.showImage = false;
	App.data.currentImage = null;
}

export function handleAddCommentBody(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-comment-body')) return;

	if (!App.data.currentImage) return;

	App.data.currentImage.data.commentBody = elem.value;
}

export function onCommentInputFocus(e: Event) {
	const elem = e.target as HTMLInputElement;
	if (!elem.matches('#add-comment-body')) return;
	if (!App.data.currentImage) return;
	if (!App.data.currentImage.data.commentBodyError) return;

	elem.value = '';
	App.data.currentImage.data.commentBodyError = false;
}

export async function addComment(e: Event) {
	const elem = e.target as HTMLFormElement;
	if (!elem.matches('#add-comment-form')) return;
	if (!App.data.currentImage) return;

	e.preventDefault();

	const imageDetail = App.data.currentImage;
	if (imageDetail.data.commentBody.trim() === '') {
		imageDetail.data.commentBodyError = true;
		const input = document.querySelector('#add-comment-body') as HTMLInputElement;
		input.value = 'You cannot send empty message!';
		return;
	}
	const body = new FormData();
	console.log(imageDetail.data.commentBody);
	body.append('body', imageDetail.data.commentBody);
	body.append('imageId', imageDetail.data.image.id.toString());

	try {
		const response = await fetch(`${contextPath}/comments`, { method: 'post', body });
		switch (response.status) {
			case 200:
				const comment: CommentWithUsername = await response.json();
				imageDetail.data.comments.push(comment);
				imageDetail.render();
				imageDetail.data.commentBody = '';
				(document.querySelector('#add-comment-form') as HTMLFormElement).reset();
				return;
			case 400:
			case 500:
				const error: GenericError = await response.json();
				ErrorAlert.data.message = 'Something went wrong! ' + error.error;
				App.data.showError = true;
				App.attach(ErrorAlert);
				App.data.showImage = false;
				App.data.currentImage = null;
				return;
			default:
				break;
		}
	} catch (error) {
		ErrorAlert.data.message = 'Something went wrong! Possible network error!';
		App.data.showError = true;
		App.attach(ErrorAlert);
		App.data.showImage = false;
		App.data.currentImage = null;
		console.error(error);
	}
}
