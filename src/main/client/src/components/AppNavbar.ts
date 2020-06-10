import App from "./App";
import Yogurt from "../yogurt";
import { contextPath } from "../utils";

const data: AppNavbar = {
	isLogged: false
}

const template: Template<AppNavbar> = (props) => `
	<nav>
		<div class="container mx-auto">
			<div class="w-full flex justify-between items-center">
				<a id="home-btn" href="${contextPath}" class="brand-logo">Image Gallery</a>
				<div class="flex-grow ml-6">
					<a id="dashboard-nav" href="#" class="btn btn-blue">Dashboard</a>
				</div>
				<div class="flex">
					<a id="signout-btn" href="#" class="btn btn-blue">Sign Out</a>
				</div>
			</div>
		</div>
	</nav>
`

const AppNavbar = new Yogurt<AppNavbar>({
	selector: '#app-navbar',
	data,
	template,
	attachTo: App
});

export default AppNavbar;