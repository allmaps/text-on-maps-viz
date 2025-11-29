import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'

import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), '../data/']
    }
  },
  plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
  ssr: {
    noExternal: ['maplibre-gl', 'maplibre-contour']
  }
})
