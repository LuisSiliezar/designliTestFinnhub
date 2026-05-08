export interface Dish {
    id: string;
    name: string;
    description?: string;
    image?: string;
    score?: number;
    category?: string;
    restaurantId?: string;
    restaurantName?: string;
    city?: string;
    priceRange?: '$' | '$$' | '$$$' | '$$$$';
    tags?: string[];
}
