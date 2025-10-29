export function headerSeccion(texto) {
    return (<p className="text-3xl mb-5 font-bold">{texto}</p>)
}

export function entradaFormulario(etiqueta, elemValor) {
    return (
        <div className="flex m-1">
            <div className="w-[200px]">{etiqueta}:</div>
            <div className="w-full">
                {elemValor}
            </div>
        </div>
    );
}

export function botonFormulario(label, onClick = () => {}) {
    return (<div className="mt-5">
        <button className="bg-blue-900 px-2 py-1 rounded-lg text-white font-bold" onClick={onClick}>
            {label}
        </button>
    </div>)
}