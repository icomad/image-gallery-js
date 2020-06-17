import { isLogged, contextPath } from './utils';
import Dashboard from './components/Dashboard';
import App from './components/App';
import AppNavbar from './components/AppNavbar';
import AddAlbumForm from './components/AddAlbumForm';
import AlbumGrid from './components/AlbumGrid';
import { retrieveAlbums, openAlbum, deleteSuccessAlert, deleteErrorAlert, appSignOut, appGoToDashboard, handleAddAlbumTitle, addAlbum, handleAddImageTitle, handleAddImageDescription, handleAddImageFile, addImage, prevPage, nextPage, openImage, closeModal, handleAddCommentBody, addComment, onCommentInputFocus, } from './actions';
import LoadingModal from './components/LoadingModal';
document.addEventListener('DOMContentLoaded', function () {
    if (!isLogged()) {
        window.location.href = contextPath;
    }
    document.addEventListener('render', function (event) {
        retrieveAlbums(event);
    });
    document.addEventListener('click', function (event) {
        // ALERTS
        deleteSuccessAlert(event);
        deleteErrorAlert(event);
        // APP NAVBAR
        appSignOut(event);
        appGoToDashboard(event);
        // DASHBOARD
        openAlbum(event);
        // ALBUM DETAIL
        prevPage(event);
        nextPage(event);
        // IMAGE DETAIL
        closeModal(event);
    });
    document.addEventListener('submit', function (event) {
        addAlbum(event);
        addImage(event);
        addComment(event);
    });
    document.addEventListener('focusin', function (event) {
        onCommentInputFocus(event);
    });
    document.addEventListener('change', function (event) {
        // ADD ALBUM
        handleAddAlbumTitle(event);
        // ADD IMAGE
        handleAddImageFile(event);
        handleAddImageTitle(event);
        handleAddImageDescription(event);
        // ADD COMMENT
        handleAddCommentBody(event);
    });
    document.addEventListener('mouseover', function (event) {
        openImage(event);
    });
    AppNavbar.state.isLogged = true;
    App.render();
    LoadingModal.render();
    AppNavbar.render();
    Dashboard.render();
    AddAlbumForm.render();
    AlbumGrid.render();
});
