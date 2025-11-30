import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const useRemoteD1 = process.env.USE_REMOTE_D1 === 'true'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      platformProxy: {
        configPath: './wrangler.jsonc',
        persist: { path: '.wrangler/state' },
        experimentalJsonConfig: true,
        d1Databases: useRemoteD1 ? { DB: 'remote' } : undefined
      }
    })
  }
}

export default config
