export type User = {
    id: string;
    login: string;
    password: string;
    nickname: string; 
    role: string;
    last_login: Date;
    account_created: Date;
    account_status: string;
    profile_picture: Buffer;
}

export type Token = {
    id: string;
    user_id: string;
    token: string;
    created_at: Date;
}

export type Post = {
    id: string;
    user_id: string;
    title: string;
    text: string;
}

