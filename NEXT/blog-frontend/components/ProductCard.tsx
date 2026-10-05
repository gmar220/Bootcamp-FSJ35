interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean; // Evaluado desde la vista principal
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, isAuthenticated, onEdit, onDelete, onAddToCart }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 my-2">{product.description}</p>
        <span className="text-green-600 font-semibold text-xl">${product.price}</span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {/* Botón público disponible para la simulación del carrito */}
        <button 
          onClick={() => onAddToCart(product)} 
          className="w-full bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm transition"
        >
          Agregar al Carrito
        </button>

        {/* REQUISITO DE LA TAREA: Botones CRUD administrativos condicionados a la autenticación */}
        {isAuthenticated && (
          <div className="flex gap-2 w-full mt-1 border-t pt-2">
            <button 
              onClick={() => onEdit(product)} 
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs transition"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(product.id)} 
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs transition"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}