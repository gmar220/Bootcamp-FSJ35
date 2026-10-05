'use client';

import { useState } from 'react';
import { apiEcommerce } from '../lib/api'; // Corregido para usar tu API unificada del E-commerce
import { useAuth } from '../context/AuthContext';

interface AuthBoxProps {
  onError: (msg: string | null) => void;
}

export function AuthBox({ onError }: AuthBoxProps) {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError(null);
    try {
      if (isRegistering) {
        // Petición directa al endpoint POST /api/register de tu Laravel 12
        const res = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(form),
        });
        
        if (!res.ok) throw new Error('Error al registrar el usuario en Laravel');
        
        alert('Registro exitoso. Inicia sesión.');
        setIsRegistering(false);
      } else {
        // Inicio de sesión usando Laravel Sanctum a través de apiEcommerce
        const res = await apiEcommerce.login({ email: form.email, password: form.password });
        
        // REQUISITO DE AUTENTICACIÓN: Guardamos el token Bearer en el navegador
        localStorage.setItem('token_ecommerce', res.token);
        
        // Sincronizamos el estado global de React con los datos del usuario devueltos
        login(res.token, res.user);
      }
      setForm({ name: '', email: '', password: '' });
    } catch (err: any) {
      onError(err.message || 'Error de autenticación con el servidor local');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="bg-white p-5 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm">
        <div>
          <p className="font-semibold text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token_ecommerce'); // Limpieza del token de Sanctum
            logout();
          }}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm px-3 py-1.5 rounded-md transition"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="font-bold text-slate-800 mb-3">{isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre (min 5)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black focus:outline-blue-500"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black focus:outline-blue-500"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña (mín 8 car, mayús, núm, símb)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black focus:outline-blue-500"
          required
          autoComplete="current-password"
        />
        <div className="flex items-center gap-3 pt-1">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md font-medium transition">
            {isRegistering ? 'Registrarse' : 'Entrar'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-blue-600 hover:underline transition"
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </form>
    </div>
  );
}
