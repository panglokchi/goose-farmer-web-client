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
