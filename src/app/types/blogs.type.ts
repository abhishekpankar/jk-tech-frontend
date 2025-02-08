export type Blog = {
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
    title: Blog['title'];
    about: Blog['about'];
    brief: Blog['brief'];
}