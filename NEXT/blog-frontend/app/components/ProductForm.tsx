'use client';

import { useState, useEffect } from 'react';
import { apiEcommerce } from '../lib/api';

// Declaramos la interfaz aquí mismo de forma local.
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductFormProps {
  editingProduct: Product | null;
  onSaved: () => void;
  onCancelEdit: () => void;
  onError: (message: string | null) => void;
}

export function ProductForm({ editingProduct, onSaved, onCancelEdit, onError }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Si hacemos clic en "Editar", rellenamos el formulario con los datos del producto
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price.toString());
    } else {
      setName('');
      setDescription('');
      setPrice('');
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price) {
      onError('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    try {
      setSubmitting(true);
      onError(null);

      const productData = {
        name,
        description,
        price: parseFloat(price),
      };

      if (editingProduct) {
        // Modo Edición: PUT /api/products/{id} apuntando a Laravel
        await apiEcommerce.updateProduct(editingProduct.id.toString(), productData);
      } else {
        // Modo Creación: POST /api/products apuntando a Laravel
        await apiEcommerce.createProduct(productData);
      }

      // Limpiamos el formulario y refrescamos la lista
      setName('');
      setDescription('');
      setPrice('');
      onSaved();
    } catch (err: any) {
      onError(err.message || 'Error al procesar el producto en Laravel');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-md space-y-3">
      <h3 className="font-bold text-slate-700 text-sm">
        {editingProduct ? '📝 Editar Producto' : '📦 Añadir Nuevo Producto al Catálogo'}
      </h3>

      <div className="grid grid-cols-1 gap-2">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 text-sm border rounded-md"
          disabled={submitting}
        />
        <textarea
          placeholder="Descripción o especificaciones"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 text-sm border rounded-md h-20"
          disabled={submitting}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 text-sm border rounded-md"
          disabled={submitting}
        />
      </div>

      <div className="flex gap-2 justify-end text-xs">
        {editingProduct && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-3 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-md transition"
            disabled={submitting}
          >
            Cancelar Edición
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          disabled={submitting}
        >
          {submitting ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Publicar Producto'}
        </button>
      </div>
    </form>
  );
}
