import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@presentation/theme';

export type IconName =
    | 'home' | 'search' | 'plus' | 'bookmark' | 'user'
    | 'star' | 'heart' | 'comment' | 'share' | 'map'
    | 'filter' | 'chevron-right' | 'chevron-left' | 'chevron-down'
    | 'close' | 'settings' | 'location' | 'chat' | 'fire' | 'arrow-right';

const MAP: Record<IconName, string> = {
    home: 'home-outline',
    search: 'search-outline',
    plus: 'add',
    bookmark: 'bookmark-outline',
    user: 'person-outline',
    star: 'star-outline',
    heart: 'heart-outline',
    comment: 'chatbubble-outline',
    share: 'share-outline',
    map: 'map-outline',
    filter: 'filter-outline',
    'chevron-right': 'chevron-forward',
    'chevron-left': 'chevron-back',
    'chevron-down': 'chevron-down',
    close: 'close',
    settings: 'settings-outline',
    location: 'location-outline',
    chat: 'chatbubbles-outline',
    fire: 'flame-outline',
    'arrow-right': 'arrow-forward',
};

interface Props {
    name: IconName;
    size?: number;
    color?: string;
}

const Icon = ({ name, size = 22, color = colors.ink }: Props) => (
    <Ionicons name={MAP[name]} size={size} color={color} />
);

export default Icon;
