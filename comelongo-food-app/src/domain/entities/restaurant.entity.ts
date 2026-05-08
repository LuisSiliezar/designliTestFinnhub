export interface Restaurant {
    id: string;
    name: string;
    image?: string;
    coverImage?: string;
    averageScore?: number;
    reviewsCount?: number;
    category?: string;
    address?: string;
    city?: string;
    hours?: string;
    isOpenNow?: boolean;
    priceRange?: '$' | '$$' | '$$$' | '$$$$';
}
