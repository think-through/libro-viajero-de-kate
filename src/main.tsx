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
    const swiperContainer = document.querySelector('.swiper.swiper-destinations')
    if (swiperContainer instanceof HTMLElement) {
        const { initDestinationSwiper } = await import('./interactions/swiperDestinations')
        initDestinationSwiper(swiperContainer)
    }
}

hydrateIslands()
