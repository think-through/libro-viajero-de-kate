# 🟢 CURRENT STATE [2026-02-26]

**Goal:** Fix Vite preamble error in Webflow bridge.
**Outcome:** Updated `misc/webflow_bridge.html` to dynamically inject the React Refresh preamble. This resolves the "@vitejs/plugin-react-swc can't detect preamble" error when previewing local changes on Webflow staging.
**Handoff:** Bridge script is ready to be pasted into Webflow's footer code.

---

# 📜 PREVIOUS HISTORY

# 🟢 CURRENT STATE [2026-02-26]

**Goal:** Optimize ocean rendering using Mapbox runtime styling.
**Outcome:** Removed redundant 50m ocean GeoJSON fetch. Now styling the standard Mapbox `water` layer directly using `map.setPaintProperty`. Fixed broken filter logic in `Map.tsx` and improved GeoJSON type definitions in `types.d.ts`.
**Handoff:** Map component is more efficient and follows Mapbox best practices.

---

# 📜 PREVIOUS HISTORY

# 🟢 CURRENT STATE [2026-02-26]

**Goal:** Add GeoJSON interfaces and use them in the Map component.
**Outcome:** Added `GeoJsonFeature` and `GeoJsonCollection` to `src/components/Map/types.d.ts`. Updated `src/components/Map/Map.tsx` to use these types in Axios fetches and feature mapping.
**Handoff:** Type safety improved for map data.

---

# RALPH AGENT LOG
No history yet.
