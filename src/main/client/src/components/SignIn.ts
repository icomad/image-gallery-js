import Yogurt from '../yogurt';

const data: SignInData = {
	username: '',
	password: '',
	usernameError: '',
	passwordError: '',
	genericError: false,
	remember: false,
}

const template = (props: SignInData) => `
	<div class="w-full flex justify-center">
	<div class="w-full md:w-1/2 mt-12 rounded p-4 shadow-xl flex flex-col bg-blue-600">
		<div class="text-xl border-b-2 border-gray-200 mb-8 p-2 text-gray-200">Sign In</div>
		<form id="signin-form" action="#">
			<input id="username-signin" type="text" name="username" placeholder="Username" class="w-full rounded p-2 mb-2 ${props.usernameError || props.genericError ? 'border-2 border-red-600 outline-none' : ''}" required />
			<div id="username-signin-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold ${props.usernameError ? '' : 'hidden'}">${props.usernameError}</div>

			<input id="password-signin" type="password" name="password" placeholder="Password" class="w-full rounded p-2 mb-2 ${props.passwordError || props.genericError ? 'border-2 border-red-600 outline-none' : ''}" required />
			<div id="password-signin-error" class="w-full mb-2 inline-flex px-2 text-sm text-red-800 font-bold ${props.passwordError ? '' : 'hidden'}">${props.passwordError}</div>
			<div class="w-full mb-2 p-2">
				<label class="text-gray-200">
					<input class='mr-4' type="checkbox" name="remember" id="remember-signin" ${props.remember ? 'checked' : ''} />
					Remember me?
				</label>
			</div>
			<input type="submit" class="bg-transparent text-gray-200 cursor-pointer outline-none btn btn-blue" value="Sign In" />
		</form>
	</div>
	</div>
`

const SignIn = new Yogurt<SignInData>({
	selector: '#signin-section',
	data,
	template,
});

export default SignIn;