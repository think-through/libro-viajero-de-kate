/**
 * TRAFFIC CONTROLLER
 * Scans the DOM for specific IDs or Classes and "hydrates" the appropriate
 * React components or Vanilla interactions using dynamic imports.
 */

const hydrateIslands = async () => {
    // 1. React Islands (Map)

    const mapRoot = document.getElementById('map-root')
    if (mapRoot) {
        const [{ StrictMode }, { createRoot }, { Map }] = await Promise.all([
            import('react'),
            import('react-dom/client'),
            import('./components/Map/Map'),
        ])

        createRoot(mapRoot).render(
            <StrictMode>
                <Map />
            </StrictMode>,
        )
    }

    // 2. Vanilla Interactions (Swiper)

    const swiperDestinationsContainer = document.querySelector('.swiper.swiper-destinations')
    if (swiperDestinationsContainer instanceof HTMLElement) {
        const { initDestinationSwiper } = await import('./interactions/swiperDestinations')
        initDestinationSwiper(swiperDestinationsContainer)
    }

    const swiperLatestPostsContainer = document.querySelector('.swiper.tr-wrap')
    if (swiperLatestPostsContainer instanceof HTMLElement) {
        const { initLatestPostsSwiper } = await import('./interactions/swiperLatestPosts')
        initLatestPostsSwiper(swiperLatestPostsContainer)
    }
}

hydrateIslands()
