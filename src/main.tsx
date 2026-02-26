import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Map } from './components/Map/Map'

const mapRoot = document.getElementById('map-root')
console.log(mapRoot)

if (mapRoot) {
    createRoot(mapRoot).render(
        <StrictMode>
            <Map />
        </StrictMode>,
    )
}
