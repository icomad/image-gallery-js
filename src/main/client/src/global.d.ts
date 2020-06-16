interface IndexData {
	showSuccess: boolean;
	showError: boolean;
	showIndex: boolean;
}

interface IndexNavbarData {
	isLogged: boolean;
}

interface SignInData {
	username: string;
	password: string;
	usernameError: string;
	passwordError: string;
	genericError: boolean;
	remember: boolean;
}

interface SignUpData {
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

interface SuccessData {
	message: string;
}

interface ErrorData {
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

interface AppData {
	showSuccess: boolean;
	showError: boolean;
	showDashboard: boolean;
	showAlbum: boolean;
	showImage: boolean;
	currentAlbum: IYogurt<AlbumDetailData> | null;
	currentImage: IYogurt<ImageDetailData> | null;
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

interface DashboardData {}

interface AddAlbumData {
	albumTitle: string;
	albumTitleError: string;
	genericError: boolean;
}

interface AlbumResponseError {
	error: string;
	field: 'title';
}

interface AlbumGridData {
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

interface AlbumDetailData {
	album: Album;
	images: Image[];
	imageGrid: IYogurt<ImageGridData> | null;
	imageForm: IYogurt<AddImageData> | null;
}

interface AddImageData {
	file: File | null;
	albumId: number;
	title: string;
	description: string;
}

interface ImageGridData {
	images: Image[];
	page: number;
}

interface LoadingModalData {
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

interface ImageDetailData {
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
type Attachments = IYogurt<any>[];
type Attachment = IYogurt<any>;

interface Options<T> {
	selector: string;
	data: T;
	template: Template<T>;
	attachTo?: Attachment | Attachments;
}

interface IYogurt<T> {
	elem: string;
	template: Template<T>;
	enabled: boolean;
	data: T;
	attach: (attachment: Attachment | Attachments) => void;
	detach: (attachment: Attachment | Attachments) => void;
	render: () => void;
}
