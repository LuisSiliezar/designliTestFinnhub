export interface User {
    id: string;
    name: string;
    handle: string;
    email?: string;
    avatar?: string;
    bio?: string;
    city?: string;
    reviewsCount?: number;
    averageScore?: number;
    followers?: number;
    following?: number;
}
