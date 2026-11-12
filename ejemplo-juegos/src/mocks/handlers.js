import { http, HttpResponse, delay } from 'msw';

const data = [
    {
        id: 1,
        nombre: "Azul: El jardín de la reina",
        img: "/img/juego-azul.jpg",
        precio: 20000
    },
    {
        id: 2,
        nombre: "Pictionary",
        img: "/img/juego-pictionary.jpg",
        precio: 15000
    },
    {
        id: 3,
        nombre: "Dixit",
        img: "/img/juego-dixit.jpg",
        precio: 25000
    }
];

export const handlers = [
    http.get("/api/juegos", async (req) => {
        await delay(2000);
        return HttpResponse.json(data);
    })
];