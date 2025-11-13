import { http, HttpResponse, delay } from 'msw';

const data = [
    {
        id: 1, nombre: "Planificación estratégica",
        desc: "Definición de prioridades a largo plazo.",
        tipo: "Estratégico"
    },{
        id: 2, nombre: "Desarrollo curricular",
        desc: "Gestión de los principios y la implementación del Modelo Educativo institucional.",
        tipo: "Misional"
    },{
        id: 3, nombre: "Adquisiciones",
        desc: "Soporte a los procesos de adquisición de bienes y servicios.",
        tipo: "Soporte"
    }
];

export const handlers = [
    http.get("/api/procesos", async (req) => {
        await delay(2000);
        return HttpResponse.json(data);
    })
];