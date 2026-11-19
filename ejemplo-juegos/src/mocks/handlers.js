import { http, HttpResponse, delay } from 'msw';
import { graphql } from 'msw/graphql';

const apiGraphQL = graphql.link('/graphql');

const data = [
    {
        id: 1,
        nombre: "Azul: El jardín de la reina",
        img: "/img/juego-azul.jpg",
        precio: 20000,
        jugadoresPorJuego: '2 a 4'
    },
    {
        id: 2,
        nombre: "Pictionary",
        img: "/img/juego-pictionary.jpg",
        precio: 15000,
        jugadoresPorJuego: '4 o más'
    },
    {
        id: 3,
        nombre: "Dixit",
        img: "/img/juego-dixit.jpg",
        precio: 25000,
        jugadoresPorJuego: '3 a 8'
    },
    {
        id: 4,
        nombre: "Carcassonne",
        img: "/img/juego-carcassonne.jpg",
        precio: 22990,
        jugadoresPorJuego: '2 a 5'
    },
    {
        id: 5,
        nombre: "Catan",
        img: "/img/juego-catan.jpg",
        precio: 34990,
        jugadoresPorJuego: '3 a 4'
    },
    {
        id: 6,
        nombre: "Sushi Go!",
        img: "/img/juego-sushi.webp",
        precio: 12990,
        jugadoresPorJuego: '2 a 5'
    },
    {
        id: 7,
        nombre: "Código Secreto",
        img: "/img/juego-secreto.webp",
        precio: 18990,
        jugadoresPorJuego: '2 a 8 o más'
    }
];

export const handlers = [
    http.get("/api/juegos", async (req) => {
        await delay(2000);
        return HttpResponse.json(data);
    }),
    apiGraphQL.query('ObtenerJuego', ({ variables }) => {
        const juego = data.find(juego => juego.id === variables.id);

        return HttpResponse.json({
            data: {
                juego: juego ? 
                    {
                        nombre: juego.nombre,
                        precio: juego.precio,
                        img: juego.img,
                        jugadoresPorJuego: juego.jugadoresPorJuego
                    }
                    : null
            }
        });
    })
];