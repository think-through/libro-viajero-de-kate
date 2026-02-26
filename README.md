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
/src
├── components/          # ⚛️ React Components (Complex Islands)
├── interactions/        # ⚡ Vanilla/GSAP Scripts (Lightweight)
├── styles/              # 🎨 Shared SCSS/CSS
├── main.tsx             # 🚦 Entry Point (Traffic Controller)
└── vite-env.d.ts        # TypeScript Definitions
```
