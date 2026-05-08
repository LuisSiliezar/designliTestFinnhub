export interface DishCardProps {
    id: string;
    name: string;
    image?: string;
    score?: number;
    restaurantName?: string;
    city?: string;
    onPress?: () => void;
}
