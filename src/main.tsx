import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Map } from './components/Map/Map'
import { initDestinationSwiper } from './interactions/swiperDestinations'

/**
 * TRAFFIC CONTROLLER
 * Scans the DOM for specific IDs or Classes and "hydrates" the appropriate
 * React components or Vanilla interactions.
 */

// 1. React Islands
const mapRoot = document.getElementById('map-root')
if (mapRoot) {
    createRoot(mapRoot).render(
        <StrictMode>
            <Map />
        </StrictMode>,
    )
}

// 2. Vanilla Interactions
const swiperContainer = document.querySelector('.swiper.swiper-destinations')
if (swiperContainer instanceof HTMLElement) {
    initDestinationSwiper(swiperContainer)
}
