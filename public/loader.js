;(function () {
    const CONFIG = {
        REPO_URL: 'https://think-through.github.io/libro-viajero-de-kate',
        DEV_SERVER: 'http://localhost:5173',
    }

    const isLocalDev =
        window.location.hostname.includes('localhost') ||
        window.location.search.includes('dev=true')
    const isStaging = window.location.hostname.includes('webflow.io')

    async function loadApp() {
        if (isLocalDev) {
            console.log('Loading from Localhost.')
            injectVitePreamble()
            injectScript(`${CONFIG.DEV_SERVER}/src/main.tsx`, 'module')
            return
        }

        console.log(`Loading from GitHub Pages (${isStaging ? 'Staging' : 'Production'}).`)
        injectLink(`${CONFIG.REPO_URL}/main.css`)
        injectScript(`${CONFIG.REPO_URL}/main.js`, 'module')
    }

    function injectVitePreamble() {
        const preamble = document.createElement('script')
        preamble.type = 'module'
        preamble.text = `
            import RefreshRuntime from '${CONFIG.DEV_SERVER}/@react-refresh'
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        `
        document.head.appendChild(preamble)
    }

    function injectScript(src, type = 'text/javascript') {
        const script = document.createElement('script')
        script.type = type
        script.src = src
        document.body.appendChild(script)
    }

    function injectLink(href) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
    }

    loadApp()
})()
