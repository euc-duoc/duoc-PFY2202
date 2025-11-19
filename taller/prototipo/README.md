# Generar proyecto Vite + Tailwind

1. npm create vite@latest

2. npm install tailwindcss @tailwindcss/vite

3. Configurar vite.config.js

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({  
    plugins: [    
        tailwindcss(),
    ],
})
```
4. Agregar imports tailwind a index.css
```css
@import "tailwindcss";
```

3. npm run dev (testear)