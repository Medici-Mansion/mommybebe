declare module NodeJS {
  interface ProcessEnv {
    readonly DB_HOST: string
    readonly DB_PORT: string
    readonly DB_USER: string
    readonly DB_PWD: string
    readonly DB_NAME: string
    readonly DB_URL: string
    readonly OPENAI_KEY: string
    readonly NEXT_PUBLIC_OPENAI_KEY: string
    readonly NEXT_PUBLIC_SERVER_URL: string
  }
}
