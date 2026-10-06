'use client';

// Declaramos la interfaz aquí mismo de forma local.
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean; // Estado enviado por el AuthContext de frontend
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, isAuthenticated, onEdit, onDelete, onAddToCart }: ProductCardProps) {
  return (
    <div className="p-4 border border-slate-200 rounded-md bg-white shadow-sm flex flex-col justify-between space-y-3">
      <div>
        {/* Renderizado dinámico de los campos provenientes de tu base de datos en Laravel */}
        <h3 className="font-bold text-slate-800 text-base">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
        <p className="text-sm font-semibold text-green-600 mt-2">${product.price}</p>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        {/* Botón de uso público para simular el carrito en localhost */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-md py-1.5 text-xs font-medium transition"
        >
          🛒 Añadir al Carrito
        </button>

        {/* REQUISITO OBLIGATORIO DE LA TAREA: Botones CRUD administrativos condicionados al login */}
        {isAuthenticated && (
          <div className="flex gap-2 w-full">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md py-1 text-xs font-medium transition border border-blue-200"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md py-1 text-xs font-medium transition border border-red-200"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
