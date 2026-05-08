export const colors = {
    ink: '#0E0E0E',
    inkSoft: '#2A2723',
    orange: '#FF5B1F',
    orangeSoft: '#FFE7DB',
    orangeDeep: '#D9421A',

    paper: '#FFFFFF',
    cream: '#FAF6F1',
    warmGray: '#F2EEE8',
    border: '#EFEAE2',
    borderStrong: '#E2DBD0',

    text: '#0E0E0E',
    textMuted: '#6F675C',
    textSubtle: '#A39B8E',

    green: '#1F8A5B',
    yellow: '#E8B62B',
} as const;

export type Colors = typeof colors;

export const scoreColor = (score: number): string => {
    if (score >= 8.5) return colors.green;
    if (score >= 6.5) return colors.orange;
    return colors.textMuted;
};
