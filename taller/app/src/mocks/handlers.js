import { http, HttpResponse, delay, graphql } from 'msw';

const discos = [
    {
      id: 1,
      img: "img/cover-01.jpg",
      nombreGrupo: "Deep Purple",
      nombreDisco: "Machine Head",
      stock: 10
    },
    {
      id: 2,
      img: "img/cover-02.jpg",
      nombreGrupo: "King Crimson",
      nombreDisco: "In the Court of the Crimson King",
      stock: 5
    },
    {
      id: 3,  
      img: "img/cover-03.jpg",
      nombreGrupo: "Pink Floyd",
      nombreDisco: "The Dark Side of the Moon",
      stock: 3
    },
    {
      id: 4,
      img: "img/cover-04.jpg",
      nombreGrupo: "Camel",
      nombreDisco: "Mirage",
      stock: 20
    },
    {
      id: 5,
      img: "img/cover-05.jpg",
      nombreGrupo: "Jethro Tull",
      nombreDisco: "Thick as a Brick",
      stock: 15
    }
];

export const handlers = [
    http.get("/api/discos", async (req) => {
        await delay(3000);
        return HttpResponse.json(discos);
    }),
    graphql.query('ObtenerDiscos', async ({ variables }) => {
        await delay(2000);
        return HttpResponse.json({ data: { discos } });
    }),
    /*
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
    })*/
];