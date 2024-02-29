import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Selon votre application, base peut aussi être "/"
  base: '',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globDirectory: 'dist/',
        globPatterns: ['**/*.{js,css,html,png}'],
        swDest: 'dist/sw.js',
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
            {
              // Mise en cache des fichiers statiques avec la stratégie CacheFirst
              urlPattern: /\.(?:js|css|html|png)$/,
              handler: 'CacheFirst'
            },
            {
              // Mise en cache des API avec la stratégie NetworkFirst
              urlPattern: /^http:\/\/localhost:3001\/api\//,
              handler: 'NetworkFirst'
            }
          ]
        },
      
      manifest: {
        // Votre configuration de manifeste ici
      },
    }),
  ],
  server: {
    // Cela garantit que le navigateur s'ouvre au démarrage du serveur
    open: true,
    // Cela définit un port par défaut à 3000  
    port: 3000,
  },
});
