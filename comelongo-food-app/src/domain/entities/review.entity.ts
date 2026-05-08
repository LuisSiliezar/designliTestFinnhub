export interface Review {
    id: string;
    dishId: string;
    dishName: string;
    restaurantName?: string;
    image?: string;
    score: number;
    note: string;
    createdAt: string;
    likes?: number;
    comments?: number;
    author: {
        id: string;
        name: string;
        handle: string;
        avatar: string;
    };
    city?: string;
    sharedTo?: ('instagram' | 'tiktok' | 'x')[];
}
