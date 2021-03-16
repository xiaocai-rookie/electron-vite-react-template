import { defineConfig } from 'vite';
import { join } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
const srcRoot = join(__dirname, 'src');

export default defineConfig({
  plugins: [reactRefresh()],
  server:{
    port:3005
  },
  base: `${__dirname}/out/`,
  build: {
    outDir: join(srcRoot, '../out/'),
    emptyOutDir: true,
    rollupOptions: {},
  },
})
