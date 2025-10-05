// src/services/api.js
export const API_BASE = "http://135.237.185.241/api";

export async function fetchUsuarios() {
  const r = await fetch(`${API_BASE}/usuarios.php`);
  if (!r.ok) throw new Error("Error al cargar usuarios");
  return r.json();
}

export async function fetchCompras(usuario_id = "") {
  const qs = usuario_id ? `?usuario_id=${usuario_id}` : "";
  const r = await fetch(`${API_BASE}/compras.php${qs}`);
  if (!r.ok) throw new Error("Error al cargar compras");
  return r.json();
}

export async function fetchFacturas(compra_id = "") {
  const qs = compra_id ? `?compra_id=${compra_id}` : "";
  const r = await fetch(`${API_BASE}/facturas.php${qs}`);
  if (!r.ok) throw new Error("Error al cargar facturas");
  return r.json();
}

export async function fetchMetodosPago() {
  const r = await fetch(`${API_BASE}/metodos_pago.php`);
  if (!r.ok) throw new Error("Error al cargar métodos de pago");
  return r.json();
}

export async function fetchLocalidades() {
  const r = await fetch(`${API_BASE}/localidades.php`);
  if (!r.ok) throw new Error("Error al cargar localidades");
  return r.json();
}
