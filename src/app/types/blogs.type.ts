export type BlogType = {
    id: number;
    title: string;
    about: string;
    brief: string;
    addedBy: number;
    comments: any;
    likes: any;
    shares: any;
    views: any;
    isDeleted: false;
    createdAt: string;
    updatedAt: string;
}

export type CreateBlogType = {
    title: BlogType['title'];
    about: BlogType['about'];
    brief: BlogType['brief'];
}