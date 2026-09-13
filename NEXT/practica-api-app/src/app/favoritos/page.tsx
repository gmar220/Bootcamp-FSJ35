import Link from "next/link";
import { CardCharacter } from "../components";
import { supabase } from "../repositories/supabase";

export default async function page() {
  // Obtener todos los personajes favoritos
  const { data: favoritos, error } = await supabase.from("favoritos").select("*");

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 sm:p-10">
      {/* Contenedor del encabezado */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Mis Personajes Favoritos ⭐
        </h1>
        
        <Link 
          href="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
        >
          ← Volver al inicio
        </Link>
      </div>

      {/* Grid Responsivo para las Tarjetas */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoritos && favoritos.length > 0 ? (
          favoritos.map((pj) => (
            <CardCharacter 
              key={pj.id} 
              id={pj.character_id} 
              nombre={pj.name} 
              imagen={pj.image} 
              estado={pj.status}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-lg">Aún no tienes personajes en favoritos.</p>
          </div>
        )}
      </div>
    </main>
  );
}
