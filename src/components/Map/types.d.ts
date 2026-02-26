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
}

type Position = [number, number] | [number, number, number]

type BoundingBox =
    | [number, number, number, number]
    | [number, number, number, number, number, number]

type Geometry =
    | { type: 'Point'; coordinates: Position }
    | { type: 'MultiPoint'; coordinates: Position[] }
    | { type: 'LineString'; coordinates: Position[] }
    | { type: 'MultiLineString'; coordinates: Position[][] }
    | { type: 'Polygon'; coordinates: Position[][] }
    | { type: 'MultiPolygon'; coordinates: Position[][][] }
    | { type: 'GeometryCollection'; geometries: Geometry[] }

export interface GeoJsonFeature<P = Record<string, unknown>> {
    type: 'Feature'
    geometry: Geometry | null
    properties: P | null
    id?: string | number
    bbox?: BoundingBox
}

export interface GeoJsonFeatureCollection<P = Record<string, unknown>> {
    type: 'FeatureCollection'
    features: GeoJsonFeature<P>[]
    bbox?: BoundingBox
}
