import MascotaCard from "./MascotaCard";

function ListaMascotas({mascotas}) {
    return mascotas.map((mascota, i) => (
      <MascotaCard mascota={mascota} />
    ))
}

export default ListaMascotas;