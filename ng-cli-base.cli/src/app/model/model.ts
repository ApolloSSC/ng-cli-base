
export class User {
    id?: number;
    username: string;
    comments?: Comment[];
    posts?: Post[];
}

export class Post {
    id?: number;
    title: string;
    body: string;
    timestamp: number;
    userId: number;
    user?: User;
    comments?: Comment[]
}

export class Comment {
    id?: number;
    body: string;
    postId: number;
    userId: number;
    post?: Post;
    user?: User;
}