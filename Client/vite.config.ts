import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'

export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5050',
				changeOrigin: true,
			},
		},
	},
	plugins: [million.vite({ auto: true }), react()],
})
