"use client";
import Image from "next/image"; // 1. Importamos el componente de optimización de imágenes
import { guardarFavorito } from "../actions/favoritos";

interface CardCharacterProps {
  id: number;
  nombre: string;
  estado: string;
  imagen: string;
}

export default function CardCharacter({ id, nombre, estado, imagen }: CardCharacterProps) {

  const handleGuardar = async () => {
    const pj = {
      id: id,
      name: nombre,
      status: estado,
      image: imagen
    };

    await guardarFavorito(pj);
    alert("¡Guardado en favoritos! ⭐");
  };

  // Color dinámico para el puntito de estado (estilo Rick & Morty oficial)
  const statusColor = 
    estado.toLowerCase() === "alive" ? "bg-green-500" : 
    estado.toLowerCase() === "dead" ? "bg-red-500" : "bg-gray-500";

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 flex flex-col justify-between">
      
      {/* Contenedor relativo para que Next.js Image use object-cover y no se pixelee */}
      <div className="relative w-full h-64 bg-gray-700 overflow-hidden">
        <Image 
          src={imagen} 
          alt={nombre}
          fill // Rellena el contenedor perfectamente sin deformar la imagen
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized // Opcional: Úsalo temporalmente si no quieres configurar next.config.js aún
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Sección de información */}
      <section className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-100 truncate" title={nombre}>
            {nombre}
          </h2>
          
          <div className="flex items-center gap-2 mt-2">
            {/* Indicador de estado circular */}
            <span className={`h-3 w-3 rounded-full ${statusColor}`} />
            <p className="text-sm font-medium text-gray-300 capitalize">
              {estado}
            </p>
          </div>
        </div>

        {/* Botón Estilizado */}
        <button 
          onClick={handleGuardar}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-md active:scale-95 text-sm"
        >
          ⭐ Guardar en favoritos
        </button>
      </section>
    </div>
  );
}
