import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      open: true,
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCaseOnly',
      },
    }
})};
