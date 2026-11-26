# Catálogo de juegos de mesa

Ejemplo de **Desarrollo Frontend II (PFY2202)** con React, Vite, React Router y Mock Service Worker (MSW). El catálogo consume una API REST simulada y la ficha de cada juego consulta una API GraphQL simulada. Ambas responden en el navegador durante el desarrollo, sin levantar un servidor de API aparte.

## Ejecutar el proyecto

Desde la carpeta `ejemplo-juegos`:

```bash
npm ci
npm run dev
```

Abre la URL que indica Vite. En `/juegos` puedes ver el catálogo. Al seleccionar un juego, la aplicación abre su ficha en `/juego/:id`.

| Vista | Petición | Datos |
| --- | --- | --- |
| Catálogo | `GET /api/juegos` | Listado de juegos |
| Ficha | `POST /graphql` con la operación `ObtenerJuego` | Nombre, precio, portada y cantidad de jugadores |

## Incorporar MSW y GraphQL a un proyecto React con Vite

Si ya estás trabajando en este repositorio, la configuración está incluida. Los pasos siguientes muestran cómo replicarla en otro proyecto.

### 1. Instalar las dependencias y generar el worker

Ejecuta estos comandos desde la carpeta que contiene `package.json`:

```bash
npm install -D msw@3 graphql@16
npx msw init public/ --save
```

El segundo comando genera `public/mockServiceWorker.js` y registra la carpeta `public` en la configuración de MSW de `package.json`. Incluye el archivo generado en el repositorio para que otros puedan ejecutar el ejemplo.

### 2. Definir los handlers de REST y GraphQL

Crea `src/mocks/handlers.js`. Este ejemplo usa un juego para mostrar la configuración. En el catálogo del repositorio, el arreglo contiene los siete juegos.

```js
import { http, HttpResponse } from 'msw'
import { graphql } from 'msw/graphql'

const apiGraphQL = graphql.link('/graphql')

const data = [
    {
        id: 4,
        nombre: 'Carcassonne',
        precio: 22990,
        img: '/img/juego-carcassonne.jpg',
        jugadoresPorJuego: '2 a 5'
    }
]

export const handlers = [
    http.get('/api/juegos', () => {
        return HttpResponse.json(data)
    }),

    apiGraphQL.query('ObtenerJuego', ({ variables }) => {
        const juego = data.find(juego => juego.id === variables.id)

        return HttpResponse.json({
            data: {
                juego: juego
                    ? {
                        nombre: juego.nombre,
                        precio: juego.precio,
                        img: juego.img,
                        jugadoresPorJuego: juego.jugadoresPorJuego
                    }
                    : null
            }
        })
    })
]
```

Si replicas el ejemplo, agrega la portada a `public/img/juego-carcassonne.jpg` o ajusta `img` a una ruta disponible en tu proyecto.

`graphql.link('/graphql')` asocia el handler con ese endpoint. `ObtenerJuego` es el nombre de la operación que MSW intercepta y `juego` es la propiedad que React lee en `data.juego`. El handler define explícitamente los campos de la respuesta.

### 3. Configurar el worker del navegador

Crea `src/mocks/browser.js`:

```js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

En `src/main.jsx`, conserva tus imports y reemplaza el arranque directo de React por este bloque:

```jsx
async function enableMocking() {
    if (!import.meta.env.DEV) return

    const { worker } = await import('./mocks/browser')
    await worker.start()
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>
    )
})
```

La aplicación espera a que el worker esté disponible antes de montar React. Así MSW puede interceptar las peticiones que se disparan al cargar la primera vista. Con esta configuración, los mocks se activan con `npm run dev`.

### 4. Enviar una consulta GraphQL

El catálogo usa `fetch('/api/juegos')`. Para la ficha, `Juego.jsx` toma el ID de la ruta con `useParams()`, lo convierte a número y lo envía a `/graphql`. Puedes probar el mismo flujo desde la consola del navegador con la aplicación abierta:

```js
const respuesta = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
            query ObtenerJuego($id: Int!) {
                juego(id: $id) {
                    nombre
                    precio
                    img
                    jugadoresPorJuego
                }
            }
        `,
        variables: { id: 4 }
    })
})

const resultado = await respuesta.json()
console.log(resultado.data.juego)
```

Con `id: 4`, deberías recibir los datos de Carcassonne. Con `id: 999`, deberías recibir `null` en `data.juego`.

## Comprobar desde el navegador

1. Abre `/juegos` y busca `GET /api/juegos` en la pestaña **Red**.
2. Selecciona Carcassonne y abre la petición `POST /graphql`. Revisa el nombre de la operación, el ID enviado en `variables` y el objeto `data.juego` en la respuesta.
3. Abre `/juego/999` para comprobar el mensaje **Juego no encontrado**.
4. Si las peticiones no son interceptadas, comprueba que estás usando `npm run dev` y que `/mockServiceWorker.js` carga en el navegador.

## Referencias

- [MSW — Integración en el navegador](https://mswjs.io/guides/integrations/browser)
- [MSW — Simulación de APIs GraphQL](https://mswjs.io/docs/graphql)
- [MSW — Migración a la versión 3](https://mswjs.io/docs/migrations/2.x-to-3.x)

## Semana 6 — Pruebas automatizadas con Vitest, React Testing Library y MSW

El proyecto incluye una prueba unitaria de una tarjeta y pruebas de integración del catálogo y la ficha de un juego. **Vitest** ejecuta las pruebas, **React Testing Library** permite comprobar lo que se muestra en pantalla y simular interacciones, y **MSW** intercepta las peticiones REST y GraphQL durante las pruebas.

### Ejecutar las pruebas

Desde la carpeta `ejemplo-juegos`, instala las dependencias del repositorio y ejecuta la suite:

```bash
npm ci
npm test
```

| Comando | Qué hace |
| --- | --- |
| `npm test` | Ejecuta todas las pruebas una vez. |
| `npm run test:watch` | Vuelve a ejecutar las pruebas al guardar cambios. |
| `npm run test:coverage` | Ejecuta la suite y genera un informe de cobertura en la terminal y en `coverage/index.html`. |

### Qué comprueban las pruebas

| Archivo | Comportamiento verificado |
| --- | --- |
| `src/components/TarjetaJuego.test.jsx` | La tarjeta enlaza a la ficha del juego y muestra **En Carrito** después de pulsar **Comprar**. |
| `src/App.test.jsx` | El catálogo carga los juegos desde REST. Al seleccionar Carcassonne, la ficha consulta GraphQL y muestra su nombre, portada y cantidad de jugadores. |
| `src/components/pages/Juego.test.jsx` | Al consultar un ID inexistente, la ficha muestra **Juego no encontrado.** |

### Incorporar esta configuración a otro proyecto React con Vite

1. Instala las dependencias de prueba:

   ```bash
   npm install -D vitest@4.1 @vitest/coverage-v8@4.1 jsdom@27 @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
   ```

2. En `vite.config.js`, importa `defineConfig` desde `vitest/config`, conserva los plugins actuales y agrega el bloque `test`:

   ```js
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
   ```

3. Crea `src/test/setup.js` para cargar los comparadores del DOM y reutilizar los handlers de MSW:

   ```js
   import '@testing-library/jest-dom/vitest'
   import { cleanup } from '@testing-library/react'
   import { afterAll, afterEach, beforeAll } from 'vitest'
   import { setupServer } from 'msw/node'
   import { handlers } from '../mocks/handlers'

   const server = setupServer(...handlers)

   beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

   afterEach(() => {
       cleanup()
       server.resetHandlers()
   })

   afterAll(() => server.close())
   ```

   En desarrollo, MSW usa `setupWorker` en el navegador. En las pruebas, `setupServer` intercepta las peticiones en Node usando los mismos handlers de `src/mocks/handlers.js`. La opción `onUnhandledRequest: 'error'` permite detectar peticiones sin un mock configurado.

4. Agrega estos scripts al objeto `scripts` de `package.json`:

   ```json
   "test": "vitest run",
   "test:watch": "vitest",
   "test:coverage": "vitest run --coverage"
   ```

### Leer el informe de cobertura

Después de ejecutar `npm run test:coverage`, revisa la fila **`All files`** para ver el resultado global. En la ejecución de referencia se obtuvo:

| Métrica | Cobertura |
| --- | ---: |
| Sentencias (`Stmts`) | 71,64 % |
| Funciones (`Funcs`) | 73,91 % |
| Líneas (`Lines`) | 70,76 % |
| Ramas (`Branch`) | 57,14 % |

Las tres métricas solicitadas en la actividad —sentencias, funciones y líneas— superan el 50 %. El informe HTML permite revisar las líneas pendientes por archivo. Por ejemplo, `Juego.jsx` alcanzó el 100 % de funciones, pero el 57,14 % de ramas. Esto muestra que una prueba puede ejecutar una función y dejar casos condicionales sin recorrer.

**Para la entrega formativa:** este repositorio usa Vitest como alternativa en la demostración de clase. Las instrucciones de la actividad solicitan Jest y React Testing Library, junto con MSW para simular las integraciones con el backend.