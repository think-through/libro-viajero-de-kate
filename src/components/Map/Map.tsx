import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import type { Feature, FeatureCollection } from 'geojson'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../../styles/Map.css'
import { parseMapData, getCurrentCountry } from './mapData'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const MEXICO_CENTER: [number, number] = [-102.5528, 23.6345]
const COUNTRIES_SOURCE_URL =
    import.meta.env.VITE_NATURAL_EARTH_URL + '/ne_50m_admin_0_countries.geojson'

const RESP_ZOOM = {
    mobile: { max: 4, min: 2 },
    tablet: { max: 4, min: 2 },
    desktop: { max: 4, min: 2 },
}

const getBreakpoint = () => {
    const w = window.innerWidth
    if (w < 640) return 'mobile'
    if (w < 1024) return 'tablet'
    return 'desktop'
}

const normalize = (str: string | null) =>
    String(str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

export const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<mapboxgl.Map | null>(null)

    const focusCountryResponsive = (map: mapboxgl.Map, center: [number, number], offset = 0) => {
        const bp = getBreakpoint()
        const clamp = RESP_ZOOM[bp]
        const baseZoom = (clamp.max + clamp.min) / 2
        const desiredZoom = Math.max(clamp.min, Math.min(clamp.max, Math.round(baseZoom + offset)))

        map.flyTo({
            center,
            zoom: desiredZoom,
            duration: 1200,
            essential: true,
        })
    }

    useEffect(() => {
        if (!mapContainerRef.current) return

        const { countries, destinations, blogPosts } = parseMapData()

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [0, 20],
            zoom: 3.3,
            minZoom: 3,
            maxZoom: 13,
            renderWorldCopies: false,
        })

        mapRef.current = map

        map.on('load', () => {
            map.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

            // 1. Style existing Water Layer
            if (map.getLayer('water')) {
                map.setPaintProperty('water', 'fill-color', '#B4BEE4')
                map.setPaintProperty('water', 'fill-opacity', 0.8)
            }

            // 2. Add Countries Layer
            axios.get<FeatureCollection>(COUNTRIES_SOURCE_URL).then(async (response) => {
                const geoData = response.data
                const normalizedNames = countries.map((c) => c.name)

                // Filter features that match our visited countries
                const visitedFeatures = geoData.features.filter((f: Feature) => {
                    const name = f.properties?.name
                    return name && normalizedNames.includes(normalize(name as string))
                })

                map.addSource('countries', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: visitedFeatures
                            .filter((f) => f.geometry !== null)
                            .map((f: Feature) => ({
                                ...f,
                                properties: {
                                    ...f.properties,
                                    normalizedName: normalize(f.properties?.name as string),
                                },
                            })),
                    },
                })

                map.addLayer({
                    id: 'countries-layer',
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': '#FFE0B2',
                        'fill-opacity': [
                            'interpolate',
                            ['exponential', 1.5],
                            ['zoom'],
                            3,
                            0.8,
                            7,
                            0.2,
                        ],
                    },
                })

                // Handle Country Clicks
                map.on('click', 'countries-layer', (e) => {
                    if (e.features && e.features[0]) {
                        const name = e.features[0].properties?.normalizedName
                        const country = countries.find((c) => c.name === name)
                        if (country) {
                            window.location.href = `/paises/${country.slug}`
                        }
                    }
                })

                map.on('mouseenter', 'countries-layer', () => {
                    map.getCanvas().style.cursor = 'pointer'
                })
                map.on('mouseleave', 'countries-layer', () => {
                    map.getCanvas().style.cursor = ''
                })

                const current = getCurrentCountry(countries)
                if (current) {
                    if (current.coords) {
                        focusCountryResponsive(map, [current.coords.lng, current.coords.lat])
                    }
                } else {
                    focusCountryResponsive(map, MEXICO_CENTER)
                }
            })

            // 3. Add Destination Markers
            destinations.forEach((dest) => {
                const blog = blogPosts.find((b) => b.city === dest.city)
                if (!blog) return

                console.log('blog: ', blog)

                const el = document.createElement('div')
                el.className = 'blog-marker'

                const imgContainer = document.createElement('div')
                imgContainer.className = 'blog-marker-image-container'

                if (blog.image) {
                    const img = document.createElement('img')
                    img.className = 'blog-marker-image'
                    img.src = blog.image
                    img.alt = blog.title
                    imgContainer.appendChild(img)
                } else {
                    const dot = document.createElement('div')
                    dot.className = 'marker-dot'
                    imgContainer.appendChild(dot)
                }

                el.appendChild(imgContainer)

                if (blog.title) {
                    const title = document.createElement('div')
                    title.className = 'blog-marker-title'
                    title.textContent = blog.title
                    el.appendChild(title)
                }

                new mapboxgl.Marker({
                    element: el,
                    anchor: 'bottom',
                })
                    .setLngLat([dest.coords.lng, dest.coords.lat])
                    .addTo(map)

                el.addEventListener('click', () => {
                    window.location.href = `/blog-posts/${blog.slug}`
                })
            })
        })

        const handleResize = () => {
            if (mapRef.current) {
                const current = getCurrentCountry(countries)
                if (current && current.coords) {
                    focusCountryResponsive(mapRef.current, [current.coords.lng, current.coords.lat])
                } else {
                    focusCountryResponsive(mapRef.current, MEXICO_CENTER)
                }
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (mapRef.current) {
                mapRef.current.remove()
            }
        }
    }, [])

    return (
        <div
            ref={mapContainerRef}
            className="map-wrapper"
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
        />
    )
}
