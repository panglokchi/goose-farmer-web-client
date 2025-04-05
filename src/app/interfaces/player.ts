export interface Player {
    user: {
        username: string,
        last_login: string,
        date_joined: string,
    },
    exp?: number,
    level: number,
    eggs?: number,
    coop_level?: number,
    summons?: number,
    feed?: number
}
