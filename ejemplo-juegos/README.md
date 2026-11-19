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