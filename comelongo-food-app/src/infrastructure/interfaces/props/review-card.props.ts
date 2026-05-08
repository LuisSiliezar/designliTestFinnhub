import type { Review } from '@domain/entities';

export interface ReviewCardProps {
    review: Review;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onSave?: () => void;
}
