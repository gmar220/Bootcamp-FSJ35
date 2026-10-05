const BASE_URL = 'http://localhost:8000/api';

const getHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token_ecommerce');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

export const apiEcommerce = {
  // --- AUTENTICACIÓN ---
  async login(credentials: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Error al iniciar sesión');
    return res.json();
  },

  // --- CATÁLOGO DE PRODUCTOS (CRUD) ---
  async getProducts() {
    const res = await fetch(`${BASE_URL}/products`, { method: 'GET', headers: getHeaders() });
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
  },

  async createProduct(productData: { name: string; description: string; price: number }) {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('No autorizado o error al crear producto');
    return res.json();
  },

  async updateProduct(id: string, productData: Partial<{ name: string; description: string; price: number }>) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('No autorizado o error al editar producto');
    return res.json();
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE', headers: getHeaders() });
    if (!res.ok) throw new Error('No autorizado o error al eliminar producto');
    return res.json();
  },

  // --- PASARELA DE PAGOS (STRIPE SIMULADO) ---
  async checkout(cartItems: any[]) {
    const res = await fetch(`${BASE_URL}/checkout`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ items: cartItems }),
    });
    if (!res.ok) throw new Error('Error en el procesamiento del pago');
    return res.json();
  }
};
