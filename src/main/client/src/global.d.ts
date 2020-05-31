interface SignInResponseError{
    error: string;
    field: 'username' | 'password' | 'all';
}

interface SignUpResponseError{
    error: string;
    field: 'username' | 'password' | 'email' | 'confirmPassword' | 'all';
}

interface GenericError{
    error: string;
}

interface Album{
    id: number;
    title: string;
    createdAt: Date;
    order: number;
    userId: number;
}

interface AlbumState{
    albums: Album[]
}

interface AlbumResponseError{
    error: string;
    field: 'title';
}

interface Image{
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    albumId: number;
    userId: number;
    path: string;
}


