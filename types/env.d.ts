/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_DEV_SERVER_PROXY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
