export type Env = {
  Bindings: {
    /** Static assets built by Astro (see `assets` in wrangler.jsonc). */
    ASSETS: Fetcher;
    /** Cloudflare Email Service binding, restricted to the NOTIFY_TO address. */
    NOTIFY_EMAIL: SendEmail;
    /** Verified Email Routing destination that receives form notifications. */
    NOTIFY_TO: string;
    /** Sender on a domain onboarded to Cloudflare Email Service. Empty disables notifications. */
    NOTIFY_FROM: string;
  };
};
