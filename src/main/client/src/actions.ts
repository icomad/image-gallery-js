import * as DOM from "./elements";
import {isLogged, render, sortableGrid, validateEmail} from "./utils";
import {contextPath} from "./constants";
import {albumElem, albumGrid, imageCollection, imageElem, imageGrid} from "./templates";

export function forbidAccess(){
    displayError("You are not signed in!");
    window.location.href = `${contextPath}`;
}

export function goBackHome(){
    window.location.href = contextPath;
}

export function displayError(error: string){
    DOM.errorBody.innerText = error;
    DOM.errorSection.classList.remove('hidden');
}

export function displaySuccessMessage(message: string){
    DOM.successBody.innerText = message;
    DOM.successSection.classList.remove('hidden');
}

export function enableDeleteAlert(){
    const deleteAlertButtons = document.querySelectorAll('.alert-delete') || [];
    deleteAlertButtons.forEach(button => button.addEventListener('click', () => DOM.errorSection.classList.add('hidden')));
}

export function toggleDashboardSection(){
    if (!isLogged()){
        displayError("You are not signed in!");
        return;
    }

    if (DOM.dashboardSection.classList.contains('hidden')){
        DOM.addImageForm.reset();
        DOM.albumSection.classList.add('hidden');
        DOM.imageSection.classList.add('hidden');
        DOM.dashboardSection.classList.remove('hidden');
    }
}

export function nextImagePage(e: Event){
    const startingIndex = parseInt((e.currentTarget as HTMLElement).dataset.index!);
    // @ts-ignore
    const imageGrid = [...DOM.imageGridContainer.children].find((child: HTMLElement) => !child.classList.contains('hidden'));
    if (imageGrid !== undefined){
        [...imageGrid.children].forEach((image, index) => {
            if (index < startingIndex) image.classList.add('hidden');
            if (index >= startingIndex && index < startingIndex+5) image.classList.remove('hidden');
        })
    }
}

export function prevImagePage(){}

export async function toggleAlbumSection(e: Event){
    if (!isLogged()){
        displayError("You are not signed in!");
        return;
    }

    DOM.nextButton.classList.add('hidden');
    DOM.nextButton.dataset.index = "0";
    DOM.backButton.classList.add('hidden')
    DOM.backButton.dataset.index = "0";

    const albumId = (e.currentTarget as HTMLElement).dataset.target;
    const albumTitle = (e.currentTarget as HTMLElement).dataset.title;

    DOM.albumSectionTitle.innerText = albumTitle!;
    DOM.addImageAlbumId.value = albumId!;

    // @ts-ignore
    const imageGridRetrieved = [...DOM.imageGridContainer.children].find((child: HTMLElement) => child.dataset.album == albumId);

    if (imageGridRetrieved !== undefined){
        DOM.dashboardSection.classList.add('hidden');
        DOM.imageSection.classList.add('hidden');
        DOM.albumSection.classList.remove('hidden');

        if (imageGridRetrieved.childElementCount > 5) {
            DOM.nextButton.classList.remove('hidden');
            DOM.nextButton.dataset.index = "5";
        }

        // @ts-ignore
        [...DOM.imageGridContainer.children].forEach((child: HTMLElement) => {
            child.dataset.album !== albumId ? child.classList.add('hidden') : child.classList.remove('hidden');
        })
        return;
    }

    try{
        const response = await fetch(`${contextPath}/images?albumId=${albumId}`);
        switch (response.status) {
            case 200:
                const {album, images}: {album: Album, images: Image[]} = await response.json();

                if (images.length > 5) {
                    DOM.nextButton.classList.remove('hidden');
                    DOM.nextButton.dataset.index = "5";
                }

                const imageGridElem = imageGrid(album.id);
                const imageCollectionElem = imageCollection(images);

                if (Array.isArray(imageCollectionElem)){
                    imageCollectionElem.forEach((image, index) => {
                        image.addEventListener('click', toggleImageModal);
                        if (index > 4) image.classList.add('hidden');
                        else image.classList.remove('hidden');
                        imageGridElem.appendChild(image);
                    });
                } else imageGridElem.appendChild(imageCollectionElem)

                DOM.imageGridContainer.appendChild(imageGridElem);

                if (DOM.albumSection.classList.contains('hidden')){
                    DOM.dashboardSection.classList.add('hidden');
                    DOM.imageSection.classList.add('hidden');
                    DOM.albumSection.classList.remove('hidden');
                    // @ts-ignore
                    [...DOM.imageGridContainer.children].forEach((child: HTMLElement) => {
                        child.dataset.album !== albumId ? child.classList.add('hidden') : child.classList.remove('hidden');
                    })
                }
                return;
            case 400:
            case 500:
                const error: GenericError = await response.json();
                displayError("Something went wrong! " + error.error);
                return;
            default:
                return;
        }
    } catch (e) {
        console.log(e);
        displayError("Something went wrong!");
    }
}

export async function addImage(e: Event){
    e.preventDefault();

    if (!isLogged()) {
        displayError("You are not signed in!");
        return;
    }

    const body = new FormData(DOM.addImageForm);

    try{
        const response = await fetch(`${contextPath}/images`, {method: 'post', body});
        switch (response.status) {
            case 200:
                const image: Image = await response.json();
                // @ts-ignore
                const imageGrid = [...DOM.imageGridContainer.children].find((child: HTMLElement) => child.dataset.album == image.albumId) as HTMLElement;
                if (imageGrid.childElementCount === 1 && !imageGrid.firstElementChild!.classList.contains('image')){
                    imageGrid.removeChild(imageGrid.firstElementChild!);
                }
                const imageElement = render(imageElem(image));
                imageElement.addEventListener('click', toggleImageModal);
                imageGrid.insertBefore(imageElement, imageGrid.firstElementChild);

                if (imageGrid.childElementCount > 5) {
                    DOM.nextButton.classList.remove('hidden');
                    DOM.nextButton.dataset.index = "5";
                    // @ts-ignore
                    [...imageGrid.children].forEach((child, index) => {
                        if (index > 4) child.classList.add('hidden');
                        else child.classList.remove('hidden');
                    })
                }

                DOM.addImageForm.reset();
                return;
            case 400:
            case 500:
                const error: GenericError = await response.json();
                displayError("Something went wrong! " + error.error);
                DOM.addImageForm.reset();
                return;
            default:
                return;
        }
    } catch (e) {
        console.log(e);
        displayError("Something went wrong!");
        DOM.addImageForm.reset();
    }
}

export function toggleImageModal(e: Event){

}

export function toggleSignInSection(){
    if (isLogged()){
        displayError("You are already signed in!");
        return;
    }

    if (DOM.signInSection.classList.contains('hidden')) {
        DOM.signUpSection.classList.add('hidden');
        DOM.signInSection.classList.remove('hidden');
    }
}

export function toggleSignUpSection() {
    if (isLogged()){
        displayError("You are already signed in!");
        return;
    }

    if (DOM.signUpSection.classList.contains('hidden')) {
        DOM.signInSection.classList.add('hidden');
        DOM.signUpSection.classList.remove('hidden');
    }
}

export function toggleNavbarActiveBtn(){
    DOM.signOutBtn.classList.toggle('hidden');
    DOM.signInNav.classList.toggle('hidden');
    DOM.signUpNav.classList.toggle('hidden');
    DOM.dashboardBtn.classList.toggle('hidden');
}

export async function signOut(){
    if (!isLogged()) {
        displayError("You are not signed in!");
        return;
    }

    try{
        const response = await fetch(`${contextPath}/signout`)
        if (response.status === 200){
            sessionStorage.removeItem("user");
            displaySuccessMessage("You successfully signed out!")
            window.location.href = contextPath;
        }
    } catch (e) {
        displayError('Something went wrong! Network error!');
    }
}

export async function signUp(e: Event){
    e.preventDefault();

    if (isLogged()){
        displayError("You are already signed in!");
        return;
    }

    const body = new FormData(DOM.signUpForm);

    try{
        const response = await fetch(`${contextPath}/signup`, { method: 'POST', body });
        switch (response.status) {
            case 200:
                const user = await response.json();
                sessionStorage.setItem("user", user);
                window.location.href = `${contextPath}/app.html`;
                DOM.signInForm.reset();
                return;
            case 400:
                const error: SignUpResponseError = await response.json();
                displayError("OH! Something went wrong!");
                if (error.field === 'username'){
                    toggleSignUpUsernameError(true, error.error);
                }
                else if(error.field === 'email'){
                    toggleSignUpMailError(true, error.error);
                }
                else if(error.field === 'password'){
                    toggleSignUpPasswordError(true, error.error);
                }
                else if(error.field === 'confirmPassword'){
                    toggleSignUpPasswordCheckError(true, error.error);
                    toggleSignUpPasswordError(true, error.error);
                }
                return;
            case 500:
                const err: SignInResponseError = await response.json();
                displayError("OH! Something went wrong! " + err.error);
                DOM.signInForm.reset();
                return;
            default:
                return;
        }
    } catch(e){
        displayError('Something went wrong! Network error!');
        DOM.signUpForm.reset();
    }

}

export async function signIn(e: Event){
    e.preventDefault();

    if (isLogged()){
        displayError("You are already signed in!");
        return;
    }

    const body = new FormData(DOM.signInForm);

    try{
        const response = await fetch(`${contextPath}/signin`, { method: 'POST', body });
        switch (response.status) {
            case 200:
                const user = await response.json();
                sessionStorage.setItem("user", user);
                window.location.href = `${contextPath}/app.html`;
                DOM.signInForm.reset();
                return;
            case 401:
            case 500:
                const err: SignInResponseError = await response.json();
                displayError("OH! Something went wrong! " + err.error);
                return;
            case 400:
                const error: SignInResponseError = await response.json();
                displayError("OH! Something went wrong!");
                if (error.field === 'username'){
                    toggleSignInUsernameError(true, error.error);
                }
                else if(error.field === 'password'){
                    toggleSignInPasswordError(true, error.error);
                }
                return;
            default:
                return;
        }
    } catch(e){
        displayError('Something went wrong! Network error!');
        DOM.signInForm.reset();
    }
}

export function toggleSignInUsernameError(enable: boolean, error: string | null = null){
    if (enable && error){
        DOM.signInUsername.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignInError.classList.remove('hidden');
        DOM.usernameSignInError.innerText = error;
    } else{
        DOM.signInUsername.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignInError.innerText = '';
        DOM.usernameSignInError.classList.add('hidden');
    }
}

export function toggleSignInPasswordError(enable: boolean, error: string | null = null){
    if (enable && error){
        DOM.signInPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignInError.classList.remove('hidden');
        DOM.passwordSignInError.innerText = error;
    } else{
        DOM.signInPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignInError.innerText = '';
        DOM.passwordSignInError.classList.add('hidden');
    }
}

export function toggleSignUpUsernameError(enable: boolean, error: string | null = null){
    if (enable && error){
        DOM.signUpUsername.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignUpError.classList.remove('hidden');
        DOM.usernameSignUpError.innerText = error;
    } else{
        DOM.signUpUsername.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.usernameSignUpError.innerText = '';
        DOM.usernameSignUpError.classList.add('hidden');
    }
}

export function toggleSignUpMailError(enable: boolean, error: string | null = null){
    if (enable && error){
        DOM.signUpEmail.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.classList.remove('hidden');
        DOM.emailSignUpError.innerText = error;
    } else{
        DOM.signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.innerText = '';
        DOM.emailSignUpError.classList.add('hidden');
    }
}

export function toggleSignUpPasswordError(enable: boolean, error: string | null = null){
    if (enable && error){
        DOM.signUpPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignUpError.classList.remove('hidden');
        DOM.passwordSignUpError.innerText = error;
    } else{
        DOM.signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.passwordSignUpError.innerText = '';
        DOM.passwordSignUpError.classList.add('hidden');
    }
}

export function toggleSignUpPasswordCheckError(enable: boolean, error: string | null = null){
    if (enable && error){
        DOM.signUpConfirmPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.confirmPasswordError.classList.remove('hidden');
        DOM.confirmPasswordError.innerText = error;
    } else{
        DOM.signUpConfirmPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.confirmPasswordError.innerText = '';
        DOM.confirmPasswordError.classList.add('hidden');
    }
}

export function checkEmailValidity(e: Event){
    const el = (e.target as HTMLInputElement);
    if (!validateEmail(el.value)){
        DOM.signUpEmail.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.classList.remove('hidden');
        DOM.emailSignUpError.innerText = 'Enter a valid email!';
    } else {
        DOM.signUpEmail.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.emailSignUpError.innerText = '';
        DOM.emailSignUpError.classList.add('hidden');
    }
}

export function checkPasswordMatch(e: Event){
    const el = (e.target as HTMLInputElement);
    const password = DOM.signUpForm.password.value;
    if(el.value !== password){
        DOM.signUpPassword.classList.add('border-2', 'border-red-500', 'outline-none');
        DOM.signUpConfirmPassword.classList.add('border-2', 'border-red-500', 'oultine-none');
        DOM.confirmPasswordError.classList.remove('hidden');
        DOM.confirmPasswordError.innerText = 'Passwords do not match!'
    } else{
        DOM.signUpPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.signUpConfirmPassword.classList.remove('border-2', 'border-red-500', 'outline-none');
        DOM.confirmPasswordError.innerText = ''
        DOM.confirmPasswordError.classList.add('hidden');
    }
}

export async function retrieveAlbums(){
    if (!isLogged()) {
        displayError("You are not signed in!");
        return;
    }

    try{
        const response = await fetch(`${contextPath}/albums`);
        if (response.status === 200){
            const albums: Album[] = await response.json();
            const albumCollection = albumGrid(albums);

            if (Array.isArray(albumCollection)){
                for (const album of albumCollection) {
                    album.addEventListener('click', toggleAlbumSection);
                    DOM.albumGrid.appendChild(album);
                }
            } else DOM.albumGrid.appendChild(albumCollection)

            sortableGrid(DOM.albumGrid, () => updateOrder());
        } else{
            const error: GenericError = await response.json();
            displayError('Something went wrong! ' + error.error);
        }
    } catch (e) {
        displayError('Something went wrong! Network error!');
    }
}

export async function updateOrder(){
    // @ts-ignore
    for (const album of DOM.albumGrid.children) {
        const body = new FormData();
        body.append("albumId", album.dataset.target!);
        body.append("newOrder", album.dataset.order!);
        try{
            const response = await fetch(`${contextPath}/albums`, {method: 'PUT', body});
            if (response.status !== 200) {
                const error: GenericError = await response.json();
                displayError("OPS! Something went wrong! " + error.error);
                continue;
            }
            const success = await response.json();
        } catch (e) {
            console.log(e);
            displayError("Something went wrong!");
        }
    }
}

export async function addAlbum(e: Event){
    e.preventDefault();

    if (!isLogged()) {
        displayError("You are not signed in!");
        return;
    }

    const body = new FormData(DOM.addAlbumForm);

    try{
        const response = await fetch(`${contextPath}/albums`, {method: 'POST', body});
        switch (response.status) {
            case 200:
                const album: Album = await response.json();
                if (DOM.albumGrid.childElementCount === 1 && !DOM.albumGrid.firstElementChild!.classList.contains('album')){
                    DOM.albumGrid.removeChild(DOM.albumGrid.firstElementChild!);
                }
                const albumElement = render(albumElem(album));
                albumElement.addEventListener('click', toggleAlbumSection);
                DOM.albumGrid.insertBefore(albumElement, DOM.albumGrid.firstElementChild);
                DOM.addAlbumForm.reset();
                return;
            case 400:
            case 500:
                const error: GenericError = await response.json();
                displayError('Something went wrong! ' + error.error);
                DOM.addAlbumForm.reset();
                return;
            default:
                return;
        }
    } catch (e) {
        console.log(e);
        displayError("Something went wrong!");
        DOM.addAlbumForm.reset();
    }
}