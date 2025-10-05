import React from "react";

export default function PurchaseList({ compras, onOpen }) {
  if (!compras?.length) return <p>No hay compras.</p>;

  return (
    <div className="cards-grid">
      {compras.map(c => (
        <article className="card" key={c.Compra_ID}>
          <div className="card-head">
            <h3>Compra #{c.Compra_ID}</h3>
            <span className="badge">Cliente: {c.nombre} {c.apellido}</span>
          </div>
          <div className="card-body">
            <div className="meta">
              <div>
                <div className="label">Fecha</div>
                <div className="value">{new Date(c.Fecha_Compra).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="label">Total</div>
                <div className="value strong">S/ {Number(c.Monto_total).toFixed(2)}</div>
              </div>
            </div>
            <button className="btn-primary" onClick={() => onOpen(c)}>
              Ver detalle
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
