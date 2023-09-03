export interface Games {
    id: number;
    name: string;
}

export interface GameProperty {
    id: number;
    name: string;
    gameId: number;
}

export const fakeGames: Games[] = [
    {
        id: 1,
        name: 'Pokemon',
    },
    {
        id: 2,
        name: 'Magic',
    },
    {
        id: 3,
        name: 'Yu-Gi-Oh',
    },
];

export const fakeCardTypes: GameProperty[] = [
    {
        id: 4,
        name: 'Fairy',
        gameId: 1,
    },
    {
        id: 5,
        name: 'Enchantment',
        gameId: 2,
    },
    {
        id: 6,
        name: 'Field Spell',
        gameId: 3,
    },
];

export const fakeSets: GameProperty[] = [
    {
        id: 7,
        name: 'XY-Roaring Skies',
        gameId: 1,
    },
    {
        id: 8,
        name: 'Kamigawa: Neon Dynasty',
        gameId: 2,
    },
    {
        id: 9,
        name: 'Duelist Nexus',
        gameId: 3,
    },
];

export const fakeRarities: GameProperty[] = [
    {
        id: 10,
        name: 'Common',
        gameId: 1,
    },
    {
        id: 11,
        name: 'Uncommon',
        gameId: 2,
    },
    {
        id: 12,
        name: 'Ultra Rare',
        gameId: 3,
    },
];
