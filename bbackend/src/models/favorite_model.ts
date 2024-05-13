export interface Game {
    id: string
    name: string
    thumbnail: string
    rate: number
    platform: string
}

export interface GameCreate {
    name: string
    thumbnail: string
    rate: number
    platform: string
}