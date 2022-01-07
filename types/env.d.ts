/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ID: string;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_DEV_SERVER_PROXY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  globEager(pattern: string): Record<
    string,
    {
      [key: string]: any;
    }
  >;
}
