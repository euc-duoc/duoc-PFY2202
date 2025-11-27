import { http, HttpResponse, delay, graphql } from 'msw';

const procesos = [
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
        return HttpResponse.json(procesos);
    }),
    graphql.query('ObtenerProcesos', async () => {
        await delay(2000);
        return HttpResponse.json({ data: { procesos } });
    }),
    graphql.query('ObtenerProceso', async ({ variables }) => {
        const { id } = variables;        

        let proceso = procesos.find((proc) => proc.id == id);
        console.log(proceso)
        await delay(2000);

        if(!proceso)
            HttpResponse.json({ 
                errors: [{ message: `No se encontró proceso con id "${id}".` }]
            });

        return HttpResponse.json({ data: { proceso } });
    }),
    graphql.mutation('ModificarProceso', async ({ variables }) => {
        const { id, desc } = variables;        

        let proceso = procesos.find((proc) => proc.id == id);
        await delay(2000);

        if(!proceso)
            HttpResponse.json({ 
                errors: [{ message: `No se encontró proceso con id "${id}".` }]
            });

        proceso.desc = desc;
        return HttpResponse.json({ data: 1 });
    })
];