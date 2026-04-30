function MascotaCard({mascota}) {
    return <div className="flex flex-col m-2 p-2 border-1 items-center">
        <div className="font-bold text-xl">{mascota.nombre}</div>
        <div>
            <img src={"./" + mascota.img} />
        </div>
        <div>Tipo: {mascota.tipo}</div>
        <div>Raza: {mascota.raza}</div>
    </div>
}

export default MascotaCard;