import { useState } from "react";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(true);
  }

  return (
    <main className="contenido">
      <div className="tw:max-w-5xl tw:mx-auto tw:px-4 tw:py-8">

        {/* Encabezado */}
        <div className="tw:text-center tw:mb-8">
          <h1 className="tw:text-3xl tw:font-bold tw:text-slate-800">
            ¿Necesitas ayuda?
          </h1>
          <p className="tw:mt-3 tw:text-gray-600">
            ¿Tienes dudas sobre nuestros juegos, pedidos o
            recomendaciones? Escríbenos y te responderemos.
          </p>
        </div>

        {/* Contenedor del formulario */}
        <div className="tw:bg-white tw:rounded-xl tw:shadow-lg tw:p-6 md:tw:p-10">

          {enviado ? (
            <div
              role="status"
              className="tw:bg-green-100 tw:text-green-800 tw:p-5 tw:rounded-lg tw:text-center"
            >
              <h2 className="tw:text-xl tw:font-bold">
                ¡Formulario completado!
              </h2>
              <p className="tw:mt-2">
                Esta es una demostración. El mensaje no
                ha sido enviado a un servidor.
              </p>
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="tw:mt-4 tw:bg-green-700 tw:text-white tw:px-5 tw:py-2 tw:rounded-lg hover:tw:bg-green-800 tw:cursor-pointer"
              >
                Escribir otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={manejarEnvio}>

              {/* Nombre y correo */}
              <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-6 tw:mb-6">

                <div>
                  <label
                    htmlFor="nombre"
                    className="tw:block tw:font-semibold tw:text-gray-700 tw:mb-2"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                    className="tw:bg-white tw:text-gray-800 tw:placeholder-gray-400 tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:p-3 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="correo"
                    className="tw:block tw:font-semibold tw:text-gray-700 tw:mb-2"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="correo"
                    type="email"
                    name="correo"
                    required
                    placeholder="nombre@ejemplo.cl"
                    className="tw:bg-white tw:text-gray-800 tw:placeholder-gray-400 tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:p-3 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                  />
                </div>
              </div>

              {/* Motivo */}
              <div className="tw:mb-6">
                <label
                  htmlFor="motivo"
                  className="tw:block tw:font-semibold tw:text-gray-700 tw:mb-2"
                >
                  Motivo de contacto
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  required
                  defaultValue=""
                  className="tw:bg-white tw:text-gray-800 tw:placeholder-gray-400 tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:p-3 tw:bg-white focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="consulta">Consulta general</option>
                  <option value="juegos">Recomendación de juegos</option>
                  <option value="pedido">Estado de un pedido</option>
                  <option value="reclamo">Reclamo o sugerencia</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="tw:mb-6">
                <label
                  htmlFor="mensaje"
                  className="tw:block tw:font-semibold tw:text-gray-700 tw:mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  required
                  minLength={10}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  className="tw:bg-white tw:text-gray-800 tw:placeholder-gray-400 tw:w-full tw:border tw:border-gray-300 tw:rounded-lg tw:p-3 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500"
                />
              </div>

              {/* Botón */}
              <div className="tw:flex tw:justify-end">
                <button
                  type="submit"
                  className="tw:bg-blue-600 tw:text-white tw:font-semibold tw:px-8 tw:py-3 tw:rounded-lg tw:shadow-md hover:tw:bg-blue-700 hover:tw:shadow-lg tw:transition-all tw:duration-200 tw:cursor-pointer"
                >
                  Enviar mensaje
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Información adicional */}
        <p className="tw:text-center tw:text-sm tw:text-gray-500 tw:mt-8">
          ¡Gracias por tu interés en nuestra tienda de juegos de mesa!
        </p>

      </div>
    </main>
  );
}

export default Contacto;