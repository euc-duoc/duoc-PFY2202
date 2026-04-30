import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ListaProcesos from "./ListaProcesos";
import { MemoryRouter } from 'react-router-dom';

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

describe('ListaProcesos test:', () => {
    it('Revisa cantidad procesos', async () => {
        render(<MemoryRouter>
            <ListaProcesos 
                listaProcesos={procesos} 
                loading={false}
            />
        </MemoryRouter>);

        const table = screen.getByRole('table');
        const rowGroups = within(table).getAllByRole('rowgroup');
        const tbody = rowGroups[1];

        const rows = within(tbody).getAllByRole('row');
        expect(rows).toHaveLength(3);
    });
});