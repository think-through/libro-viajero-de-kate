# Kate's Travel Blog - Webflow Custom Code

## Project Context for AI Agents

- **Role:** This repository manages the "Client-Side Islands" for a
  Webflow-hosted travel blog.
- **Goal:** We bypass Webflow's native interactions for complex logic (Maps)
  and high-performance animations (GSAP), injecting a single optimized bundle
  into the Webflow site.
- **Current Phase:** Migrating the "Travel Map" from Vanilla/Leaflet to
  React/Mapbox GL JS.

---

## Tech Stack

- **Build Tool:** Vite (v7+ Stable) using `TypeScript + SWC`.
- **Core Framework:** React 18 (Only for complex "Islands").
- **Styling:** SCSS / CSS Modules (scoped to components).
- **Animation:** GSAP (for non-React interactions like Carousels).
- **Maps:** `react-map-gl` (Mapbox GL JS wrapper).
- **Linting:** ESLint + Prettier.

---

## Architecture: "The Island Model"

We do **not** control the `<body>` or the Router. Webflow handles the DOM
structure, SEO, and CMS content. We "hydrate" specific `<div>` containers based
on their IDs.

### 1. The Traffic Controller (`src/main.tsx`)

This is the entry point. It scans the DOM for specific IDs.

- **IF** `#react-travel-map` exists -> Mount the `<TravelMap />` React Root.
- **IF** `.hero-carousel` exists -> Run the `initCarousel()` Vanilla/GSAP
  function.
- **ELSE** -> Do nothing (keep the bundle dormant).

### 2. Data Protocol (Webflow CMS -> React)

We do not fetch data via API calls. Data is embedded directly in the HTML by
Webflow to ensure instant loading.

1.  **Webflow:** Renders a hidden `div` with `data-attributes` containing JSON
    strings (e.g., `data-places='[{...}]'`).
2.  **React:** Reads `element.dataset.places`, parses it, and passes it as
    props.
3.  **Constraint:** NEVER hardcode content. Always expect data to be injected
    via DOM attributes.

---

## Directory Structure

```text
/public                  # Static Scripts
└── loader.js            # Webflow Integration Script (Webflow's Footer Code)
/src
├── components/          # React Components (Complex Islands)
├── interactions/        # Vanilla/GSAP Scripts (Lightweight)
├── styles/              # Shared SCSS/CSS
├── main.tsx             # Entry Point (Traffic Controller)
└── vite-env.d.ts        # TypeScript Definitions
```

## Active Feature: The Travel Map

**Status:** In Progress (Migration from Leaflet -> Mapbox).

**Requirements:**

1. **Library:** Use `react-map-gl` with Mapbox standard style.
2. **Visuals:** Highlight visited countries with a flat color fill.
    - DEPRECATED: Do not attempt to mask images inside country shapes (old Leaflet behavior).
    - Use circular markers for cities.

3. **Interactivity:**
    - Click City Marker -> Show Popup with "Read Post" link.
    - Hover Country -> Slight opacity change.

4. **Data Source:**
    - Visited Countries: Passed via data-visited (Array of strings).
    - Destinations: Passed via data-destinations (Array of objects with lat/lng).

## Development Workflow

1. **Local Dev (HMR):** Run `npm run dev`.
    - A "Split Environment" script in Webflow loads `localhost:5173/src/main.tsx` when it detects the `.webflow.io` domain.

2. **Production Build:** Run `npm run build`.
    - Vite outputs a hashed/unhashed main.js to `/dist`.
    - Upload to CDN.
    - Webflow production uses the CDN URL.

3. **TypeScript Rules:**
    - Strict Mode: ON.
    - Define Interfaces for all Webflow CMS data structures (no any types allowed).
