import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Map } from './components/Map/Map'

const mapRoot = document.getElementById('map-root') || document.getElementById('root')

if (mapRoot) {
    createRoot(mapRoot).render(
        <StrictMode>
            <Map />
        </StrictMode>,
    )
}
