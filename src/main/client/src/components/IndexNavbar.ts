import Yogurt from '../yogurt';
import Index from './Index';
import { contextPath } from '../utils';

const state: IndexNavbarState = {
	isLogged: false,
}

const template: Template<IndexNavbarState> = (props) => `
	<nav>
		<div class="container mx-auto">
			<div class="w-full flex justify-between items-center">
				<a id="home-btn" href="${contextPath}" class="brand-logo">Image Gallery</a>
				<div class="flex-grow ml-6">
					<a id="dashboard-btn" href="#" class="btn btn-blue ${props.isLogged ? '' : 'hidden'}">Dashboard</a>
				</div>
				<div class="flex">
					<a id="signout-btn" href="#" class="btn btn-blue ${props.isLogged ? '' : 'hidden'}">Sign Out</a>
					<a id="signin-nav" href="#" class="btn btn-blue mr-3 ${props.isLogged ? 'hidden' : ''}">Sign In</a>
					<a id="signup-nav" href="#" class="btn btn-blue ${props.isLogged ? 'hidden' : ''}">Sign Up</a>
				</div>
			</div>
		</div>
	</nav>
`

const IndexNavbar = new Yogurt<IndexNavbarState>({
	selector: '#index-navbar',
	state,
	template,
	childOf: Index
});

export default IndexNavbar;