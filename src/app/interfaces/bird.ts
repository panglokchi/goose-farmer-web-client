export interface Bird {
    id: number,
    name: string,
    level: number,
    stars: number,
    icon: string,
    bird_type: {
        species: string
    },
    weight: number,
    exp: number,
    health: number,
    last_level_exp: number,
    next_level_exp: number,
    egg_amount: number,
    assigned_to_coop: boolean,
    egg_timer: number,
    is_new: boolean,
    rarity: string,
    egg_timer_max: number
}

const rarityOrder: { [key: string]: number } = {
    "LEGENDARY": 4,
    "EPIC": 3,
    "RARE": 2,
    "COMMON": 1,
};

// Sorting functions
export function sortRarity(a: Bird, b: Bird): number {

    // Sort by rarity
    const rarityComparison = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    if (rarityComparison !== 0) {
        return rarityComparison;
    }

    // Sort by is_new (true first)
    if (a.is_new !== b.is_new) {
        return (a.is_new ? -1 : 1);
    }

    // Sort by level
    if (a.level !== b.level) {
        return b.level - a.level;
    }

    // Sort by id
    return a.id - b.id;
}

export function sortNew(a: Bird, b: Bird): number {

    // Sort by is_new (true first)
    if (a.is_new !== b.is_new) {
        return (a.is_new ? -1 : 1);
    }

    // Sort by rarity
    const rarityComparison = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    if (rarityComparison !== 0) {
        return rarityComparison;
    }


    // Sort by level
    if (a.level !== b.level) {
        return b.level - a.level;
    }

    // Sort by id
    return a.id - b.id;
}

export function sortLevel(a: Bird, b: Bird): number {

    // Sort by level
    if (a.level !== b.level) {
        return b.level - a.level;
    }

    // Sort by rarity
    const rarityComparison = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    if (rarityComparison !== 0) {
        return rarityComparison;
    }

    // Sort by is_new (true first)
    if (a.is_new !== b.is_new) {
        return (a.is_new ? -1 : 1);
    }

    // Sort by id
    return a.id - b.id;
}