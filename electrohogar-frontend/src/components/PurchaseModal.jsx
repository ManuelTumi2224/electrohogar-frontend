import React, { useEffect, useState } from "react";
import { fetchFacturas, fetchMetodosPago, fetchLocalidades } from "../services/api";

export default function PurchaseModal({ open, onClose, compra }) {
  const [facturas, setFacturas] = useState([]);
  const [metodos, setMetodos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open || !compra) return;
    (async () => {
      try {
        setLoading(true); setErr("");
        const [f, mp, locs] = await Promise.all([
          fetchFacturas(compra.Compra_ID),
          fetchMetodosPago(),
          fetchLocalidades()
        ]);
        setFacturas(f);
        setMetodos(mp);
        setLocalidades(locs);
      } catch (e) {
        setErr(e.message || "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, compra]);

  if (!open || !compra) return null;

  const maskClose = (e) => { if (e.target.className === "modal-mask") onClose(); };

  const metodoNombre = (id) =>
    metodos.find(m => String(m.Metodo_Pago_ID) === String(id))?.Nombre || "—";

  const direccionCliente = () => {
    const loc = localidades.find(l => String(l.Usuario_Usuario_ID) === String(compra.Usuario_Usuario_ID));
    if (!loc) return "Sin dirección registrada";
    return `${loc.Direccion_Detalle}, ${loc.Distrito}, ${loc.Provincia}, ${loc.Departamento}`;
  };

  return (
    <div className="modal-mask" onClick={maskClose}>
      <div className="modal-card">
        <header className="modal-header">
          <h3>Compra #{compra.Compra_ID}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">✕</button>
        </header>

        <section className="modal-body">
          <div className="purchase-summary">
            <div>
              <div className="label">Cliente</div>
              <div className="value">{compra.nombre} {compra.apellido}</div>
            </div>
            <div>
              <div className="label">Fecha</div>
              <div className="value">{new Date(compra.Fecha_Compra).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="label">Monto total</div>
              <div className="value strong">S/ {Number(compra.Monto_total).toFixed(2)}</div>
            </div>
          </div>

          <div className="address">
            <div className="label">Dirección de envío</div>
            <div className="value">{direccionCliente()}</div>
          </div>

          <h4>Facturas</h4>
          {loading && <p>Cargando…</p>}
          {err && <p className="error">{err}</p>}
          {!loading && !err && facturas.length === 0 && <p>No hay facturas para esta compra.</p>}

          {facturas.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Método de pago</th>
                  <th>Importe (S/)</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map(f => (
                  <tr key={f.Factura_ID}>
                    <td>{f.Factura_ID}</td>
                    <td>{new Date(f.Fecha).toLocaleDateString()}</td>
                    <td>{f.Concepto}</td>
                    <td>{metodoNombre(f.Metodo_Pago_Metodo_Pago_ID)}</td>
                    <td className="right">{Number(f.Importe).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
