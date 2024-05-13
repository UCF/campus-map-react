/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_MAPBOX_TOKEN: string
    readonly VITE_REMOTE_MENU_BASE_URL: string
    readonly VITE_REMOTE_HEADER_MENU_ID: number
    readonly VITE_REMOTE_FOOTER_MENU_ID: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
