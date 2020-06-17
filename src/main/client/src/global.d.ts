interface IndexState {
	showSuccess: boolean;
	showError: boolean;
	showIndex: boolean;
}

interface IndexNavbarState {
	isLogged: boolean;
}

interface SignInState {
	username: string;
	password: string;
	usernameError: string;
	passwordError: string;
	genericError: boolean;
	remember: boolean;
}

interface SignUpState {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	usernameError: string;
	emailError: string;
	passwordError: string;
	passwordConfirmError: string;
	genericError: boolean;
}

interface SuccessState {
	message: string;
}

interface ErrorState {
	message: string;
}

interface SignInResponseError {
	error: string;
	field: 'username' | 'password' | 'all';
}

interface SignUpResponseError {
	error: string;
	field: 'username' | 'password' | 'email' | 'confirmPassword' | 'all';
}

interface GenericError {
	error: string;
}

interface AppState {
	showSuccess: boolean;
	showError: boolean;
	showDashboard: boolean;
	showAlbum: boolean;
	showImage: boolean;
	currentAlbum: IYogurt<AlbumDetailState> | null;
	currentImage: IYogurt<ImageDetailState> | null;
}

interface AppNavbar {
	isLogged: boolean;
}

interface Album {
	id: number;
	title: string;
	createdAt: Date;
	order: number;
	userId: number;
}

interface DashboardState {}

interface AddAlbumState {
	albumTitle: string;
	albumTitleError: string;
	genericError: boolean;
}

interface AlbumResponseError {
	error: string;
	field: 'title';
}

interface AlbumGridState {
	albums: Album[];
	attempted: boolean;
}

interface Image {
	id: number;
	title: string;
	description: string;
	createdAt: Date;
	albumId: number;
	userId: number;
	path: string;
}

interface AlbumDetailState {
	album: Album;
	images: Image[];
	imageGrid: IYogurt<ImageGridState> | null;
	imageForm: IYogurt<AddImageState> | null;
}

interface AddImageState {
	file: File | null;
	albumId: number;
	title: string;
	description: string;
}

interface ImageGridState {
	images: Image[];
	page: number;
}

interface LoadingModalState {
	showModal: boolean;
	text: string;
}

interface Comment {
	id: number;
	imageId: number;
	userId: number;
	body: string;
	createdAt: Date;
}

interface CommentWithUsername {
	comment: Comment;
	username: string;
}

interface ImageDetailState {
	image: Image;
	comments: CommentWithUsername[];
	commentBody: string;
	commentBodyError: boolean;
}

/**
 *
 *
 * YOGURT TYPES
 *
 *
 */
type Template<T> = (props: T) => string;
type StyleArray = { name: string; value: string }[];
type AttrArray = { att: string; value: string }[];
type YogChildren = IYogurt<any>[];
type YogChild = IYogurt<any>;

interface Options<T> {
	selector: string;
	state: T;
	template: Template<T>;
	childOf?: YogChild | YogChildren;
}

interface IYogurt<T> {
	elem: string;
	template: Template<T>;
	state: T;
	attach: (attachment: YogChild | YogChildren) => void;
	detach: (attachment: YogChild | YogChildren) => void;
	render: () => void;
}
