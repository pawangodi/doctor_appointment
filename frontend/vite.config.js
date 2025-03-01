import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , 
    tailwindcss({ 
      theme: {
        extend: {
          colors: {
            primary: "#1E40AF" // Custom primary color
          },
        },
      },

    })]
    
})



