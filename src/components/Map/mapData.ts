import type { Country, Destination, BlogPost } from './types'

const normalize = (str: string | null) =>
    String(str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

export function parseMapData() {
    const countries: Country[] = []
    document.querySelectorAll('.map-data-country').forEach((item) => {
        const name = normalize(item.getAttribute('data-country'))
        const imageUrl = item.getAttribute('data-image') || ''
        const slug = item.getAttribute('data-slug') || ''
        const lat = item.getAttribute('data-lat')
        const lng = item.getAttribute('data-lng')

        countries.push({
            name,
            imageUrl,
            slug,
            coords: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
        })
    })

    const destinations: Destination[] = []
    document.querySelectorAll('.map-data-destination').forEach((item) => {
        const lat = item.getAttribute('data-lat')
        const lng = item.getAttribute('data-lng')
        if (!lat || !lng) return

        destinations.push({
            slug: item.getAttribute('data-slug') || '',
            city: item.getAttribute('data-city') || '',
            country: item.getAttribute('data-country') || '',
            coords: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
            },
        })
    })

    const blogPosts: BlogPost[] = []
    document.querySelectorAll('.map-data-blog-posts').forEach((item) => {
        blogPosts.push({
            city: item.getAttribute('data-city') || '',
            slug: item.getAttribute('data-blog-slug') || '',
            title: item.getAttribute('data-blog-title') || '',
            image: item.getAttribute('data-blog-image') || '',
        })
    })

    return { countries, destinations, blogPosts }
}

export function getCurrentCountry(countries: Country[]) {
    const countrySlug = window.location.pathname.split('/').filter(Boolean).pop()
    return countries.find((c) => c.slug === countrySlug)
}
