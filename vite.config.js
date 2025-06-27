import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 
  base: '/Todo App with useReducer + useFetch/',
  plugins: [react()],
})
