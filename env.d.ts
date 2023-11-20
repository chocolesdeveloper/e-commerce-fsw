declare namespace NodeJS {
  interface ProcessEnv {
    DATA_BASE: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    STRIPE_WEBHOOK_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    NEXTAUTH_PUBLIC: string;
    HOST_URL: string;
  }
}
