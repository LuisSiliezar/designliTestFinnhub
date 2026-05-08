import type { Restaurant, Review, User } from '@domain/entities';

const AVATARS = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
];

const FAKE_AUTHORS: Review['author'][] = [
    { id: 'u1', name: 'Jules', handle: '@jules.bites', avatar: AVATARS[0] },
    { id: 'u2', name: 'Theo', handle: '@theotastes', avatar: AVATARS[1] },
    { id: 'u3', name: 'Wren', handle: '@wren.eats', avatar: AVATARS[2] },
    { id: 'u4', name: 'Mira', handle: '@mira.eats', avatar: AVATARS[3] },
];

const FAKE_NOTES = [
    'Crust shatters perfectly. The filling is what your grandmother would make if she trained in Kingston.',
    'Worth the two-month wait. The marrow does the heavy lifting.',
    'Sub-$10 perfection. Crispy, tangy, the chutneys are next level.',
    'The broth has the body of a stock that\'s been simmering for 16 hours, because it has.',
    'Found it on a side street and couldn\'t stop thinking about it for a week.',
];

const FAKE_CITIES = ['Brooklyn', 'Los Angeles', 'Queens', 'San Salvador', 'CDMX'];
const FAKE_PLACES = ['Forno di Marco', 'Block Burger', 'Smokehouse', 'Dosa Hutt', 'Lilia', 'Hav & Mar'];

export class MockDataService {
    static currentUser(): User {
        return {
            id: 'u4',
            name: 'Mira Castellanos',
            handle: '@mira.eats',
            email: 'mira@comelongo.app',
            avatar: AVATARS[3],
            bio: 'Editor at Comelongo · I rate brunch harshly and ramen with grace.',
            city: 'NYC',
            reviewsCount: 184,
            averageScore: 8.4,
            followers: 2100,
            following: 312,
        };
    }

    static buildReviewForDish(dishId: string, dishName: string, image?: string): Review {
        const seed = this.hash(dishId);
        const author = FAKE_AUTHORS[seed % FAKE_AUTHORS.length];
        const note = FAKE_NOTES[seed % FAKE_NOTES.length];
        const city = FAKE_CITIES[seed % FAKE_CITIES.length];
        const place = FAKE_PLACES[seed % FAKE_PLACES.length];
        const score = Math.round((6.5 + (seed % 35) / 10) * 10) / 10;
        return {
            id: `${dishId}-r-${seed}`,
            dishId,
            dishName,
            restaurantName: place,
            image,
            score,
            note,
            createdAt: '2h',
            likes: 120 + (seed % 200),
            comments: 6 + (seed % 40),
            author,
            city,
        };
    }

    static restaurantForDish(dishId: string, dishName: string, image?: string): Restaurant {
        const seed = this.hash(dishId);
        return {
            id: `${dishId}-rest`,
            name: FAKE_PLACES[seed % FAKE_PLACES.length],
            image,
            coverImage: image,
            averageScore: Math.round((7 + (seed % 30) / 10) * 10) / 10,
            reviewsCount: 24 + (seed % 200),
            category: dishName,
            address: '142 Calle Arce, Centro',
            city: FAKE_CITIES[seed % FAKE_CITIES.length],
            hours: 'Mon–Sun · 11:00 – 23:00',
            isOpenNow: seed % 2 === 0,
            priceRange: '$$',
        };
    }

    private static hash(s: string): number {
        return s.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    }
}
