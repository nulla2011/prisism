/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly MAIN_VITE_API_TEST: string;
  readonly MAIN_VITE_DB_VERSION_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
