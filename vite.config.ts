import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5173 },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        admin: resolve(process.cwd(), 'admin.html'),
        supplier: resolve(process.cwd(), 'supplier.html'),
        driver: resolve(process.cwd(), 'driver.html'),
      }
    }
  }
})

