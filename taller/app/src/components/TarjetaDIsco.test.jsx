import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TarjetaDisco from "./TarjetaDisco";
import { MemoryRouter, Route, Routes } from "react-router-dom";


function inicializarTarjetaEjemplo() {
    render(<MemoryRouter>
            <Routes>
                <Route path="/" element={
                    <TarjetaDisco 
                        id="1" 
                        img="./cover-01.jpg"
                        nombreGrupo="Grupo inventado" 
                        nombreDisco="Disco inventado"
                        stock="20"
                    />
                }/>                    
            </Routes>                        
        </MemoryRouter>
    )
}

describe('Pruebas del componente TarjetaDisco:', () => {
    afterEach(cleanup);

    it('Se muestra un boton llamado "Ver detalle"', async () => {
        inicializarTarjetaEjemplo();

        screen.getByText('Ver Detalle');
    })

    it('La tarjeta tiene tres elementos "p"', async () => {
        inicializarTarjetaEjemplo();

        const elems = screen.getAllByRole('paragraph');
        expect(elems).toHaveLength(3);
    })
})