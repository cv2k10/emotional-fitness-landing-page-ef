export type Env = {
  Bindings: {
    /** Static assets built by Astro (see `assets` in wrangler.jsonc). */
    ASSETS: Fetcher;
  };
};
