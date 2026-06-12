import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-sibling-projects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = req.url.split('?')[0];
          // Match paths like /class3_B4/index.html or /class3_B4/style.css
          const match = urlPath.match(/^\/([a-zA-Z0-9_-]+)\/(.*)$/);
          if (match) {
            const [, folder, rest] = match;
            // Exclude common Vite/React/dependency routes
            const excludedFolders = ['src', 'public', 'node_modules', '@vite', '@id', '@react-refresh', 'id'];
            if (!excludedFolders.includes(folder) && !folder.startsWith('@') && !folder.endsWith('.js') && !folder.endsWith('.css') && !folder.endsWith('.jsx') && !folder.endsWith('.json')) {
              const projectDir = path.resolve(__dirname, '..', folder);
              if (fs.existsSync(projectDir) && fs.statSync(projectDir).isDirectory()) {
                const fileRelativePath = rest || 'index.html';
                const filePath = path.join(projectDir, fileRelativePath);
                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                  const mimeTypes = {
                    '.html': 'text/html',
                    '.js': 'application/javascript',
                    '.css': 'text/css',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.svg': 'image/svg+xml',
                    '.ico': 'image/x-icon',
                    '.json': 'application/json',
                    '.mp4': 'video/mp4',
                    '.mp3': 'audio/mpeg',
                  };
                  const ext = path.extname(filePath).toLowerCase();
                  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
                  res.end(fs.readFileSync(filePath));
                  return;
                }
              }
            }
          }
          next();
        });
      }
    }
  ],
})

