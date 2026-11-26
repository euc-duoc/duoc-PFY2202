import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Config tailwind
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  test: {
    environment: 'jsdom',
    environmentOptions: {
        jsdom: { url: 'http://localhost:5173/' }
    },
    setupFiles: ['./src/test/setup.js'],
    coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,jsx}'],
        exclude: ['src/test/**', 'src/**/*.test.{js,jsx}'],
        reporter: ['text', 'html']
    }
  } 
})
