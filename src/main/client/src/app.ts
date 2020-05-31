import {isLogged} from "./utils";
import * as DOM from "./elements";
import * as Action from "./actions";

document.addEventListener("DOMContentLoaded", async () => {
   if (!isLogged()){
      Action.forbidAccess();
      return;
   }
   Action.enableDeleteAlert();
   await Action.retrieveAlbums();
   DOM.homeBtn.addEventListener('click', Action.goBackHome);
   DOM.dashboardNav.addEventListener('click', Action.toggleDashboardSection);
   DOM.signOutBtn.addEventListener('click', Action.signOut);
   DOM.addAlbumForm.addEventListener('submit', Action.addAlbum);
   DOM.addImageForm.addEventListener('submit', Action.addImage);
   DOM.nextButton.addEventListener('click', Action.nextImagePage);
   DOM.backButton.addEventListener('click', Action.prevImagePage);
});