interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_MAPBOX_TOKEN: string
    readonly VITE_NATURAL_EARTH_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module 'swiper/css';
