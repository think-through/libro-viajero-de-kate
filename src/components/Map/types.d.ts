export interface Coords {
    lat: number
    lng: number
}

export interface Country {
    name: string
    imageUrl: string
    slug: string
    coords: Coords | null
}

export interface Destination {
    slug: string
    city: string
    country: string
    coords: Coords
}

export interface BlogPost {
    city: string
    slug: string
    title: string
    image: string
}
