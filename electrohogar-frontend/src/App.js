import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchUsuarios, fetchCompras } from "./services/api";
import PurchaseList from "./components/PurchaseList";
import PurchaseModal from "./components/PurchaseModal";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  async function load() {
    try {
      setLoading(true); setErr("");
      const [us, cs] = await Promise.all([
        fetchUsuarios(),
        fetchCompras(usuarioId)
      ]);
      setUsuarios(us);
      setCompras(cs);
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = async () => load();
  const openModal = (compra) => { setSelected(compra); setOpen(true); };
  const closeModal = () => { setOpen(false); setSelected(null); };

  return (
    <div>
      {/* NAVBAR */}
      <header className="app-header">
        <div className="logo">
          <img src="https://img.icons8.com/fluency/96/electrical.png" alt="logo"/>
          <h1>ElectroHogar</h1>
        </div>
        <nav>
          <a href="#compras">Compras</a>
          <a href="#soporte">Soporte</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Backoffice de Ventas</h2>
        <p>Consulta y analiza las compras registradas en tu plataforma e-commerce.</p>
      </section>

      {/* FILTROS */}
      <div className="filters">
        <select value={usuarioId} onChange={(e)=>setUsuarioId(e.target.value)}>
          <option value="">Todos los clientes</option>
          {usuarios.map(u => (
            <option key={u.Usuario_ID} value={u.Usuario_ID}>
              {u.Nombre} {u.Apellido}
            </option>
          ))}
        </select>
        <button className="btn-secondary" onClick={onSearch}>Filtrar</button>
      </div>

      {/* LISTA */}
      <main className="container" id="compras">
        {loading && <p>Cargando…</p>}
        {err && <p className="error">{err}</p>}
        {!loading && !err && <PurchaseList compras={compras} onOpen={openModal} />}
      </main>

      {/* MODAL */}
      <PurchaseModal open={open} onClose={closeModal} compra={selected} />

      {/* FOOTER */}
      <footer className="footer">
        © 2025 ElectroHogar S.A.C. — Panel de Compras
      </footer>
    </div>
  );
}
