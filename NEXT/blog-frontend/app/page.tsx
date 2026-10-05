'use client';

import { useCallback, useEffect, useState } from 'react';
// Cambiamos las importaciones para apuntar a los servicios del E-commerce
import { apiEcommerce } from './lib/api'; 
import { useAuth } from './context/AuthContext';
import { AuthBox } from './components/AuthBox';
import { ProductForm } from './components/ProductForm'; // Cambiado de PostForm a ProductForm
import { ProductCard } from './components/ProductCard'; // Cambiado de PostCard a ProductCard

// Definimos la interfaz del Producto alineada con tu base de datos de Laravel
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]); // Cambiado de posts a products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Cambiado de editingPost a editingProduct
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función reutilizable para recargar el catálogo después de crear/editar/eliminar
  const reloadProducts = useCallback(async () => {
    try {
      const data = await apiEcommerce.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Error al recargar productos');
    }
  }, []);

  // Carga inicial controlada (Mantiene tu excelente lógica de desmontaje)
  useEffect(() => {
    let isMounted = true;

    const fetchInitialProducts = async () => {
      try {
        setLoading(true);
        const data = await apiEcommerce.getProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error al cargar el catálogo');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este producto del catálogo?')) return;
    try {
      await apiEcommerce.deleteProduct(id.toString());
      await reloadProducts();
    } catch (err: any) {
      setError(err.message || 'No autorizado o error al eliminar');
    }
  };

  const handleAddToCart = (product: Product) => {
    // Aquí puedes enlazar tu lógica existente de Redux, Context o LocalStorage para el carrito
    console.log('Producto añadido al carrito:', product);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Login / Registro (Mapeado contra Laravel Sanctum) */}
      <AuthBox onError={setError} />

      {/* Formulario Administrativo CRUD (solo visible si está autenticado) */}
      {isAuthenticated && (
        <ProductForm
          editingProduct={editingProduct}
          onSaved={() => {
            setEditingProduct(null);
            reloadProducts();
          }}
          onCancelEdit={() => setEditingProduct(null)}
          onError={setError}
        />
      )}

      {/* Sección del Catálogo General */}
      <section className="space-y-3">
        <h2 className="font-bold text-slate-800 text-lg">Catálogo de Productos</h2>
        {loading ? (
          <p className="text-sm text-slate-400">Cargando catálogo...</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-slate-400">No hay productos disponibles en la tienda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* El requerimiento del .map aplicado directamente a tu E-commerce */}
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAuthenticated={isAuthenticated} // Controla la visibilidad de editar/eliminar
                onEdit={setEditingProduct}
                onDelete={handleDelete}
                onAddToCart={handleAddToCart} // Acción para la pasarela/carrito local
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
