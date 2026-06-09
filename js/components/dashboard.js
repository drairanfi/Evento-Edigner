import { registros } from "../core/store.js";
import { CUPOS_PRESENCIALES } from "../core/businessRules.js";
import { openModal } from "./modal.js";

export function renderDashboard() {
  const dashboard = document.getElementById("dashboard");
  if (!dashboard) return;

  const total = registros.length;
  const presenciales = registros.filter((r) => r.tipoAsistencia === "presencial").length;
  const virtuales = registros.filter((r) => r.tipoAsistencia === "virtual").length;
  const confirmados = registros.filter((r) => r.estado === "confirmado").length;
  const pendientes = registros.filter((r) => r.estado === "pendiente").length;
  const cancelados = registros.filter((r) => r.estado === "cancelado").length;

  dashboard.innerHTML = `
    <div class="dashboard__header">
      <h2 class="dashboard__title">Resumen del evento</h2>
      <div class="dashboard__actions">
        <button type="button" id="btn-ver-lista" class="form__button form__button--secondary">Ver registrados</button>
        <button type="button" id="btn-nuevo" class="form__button form__button--primary">Nuevo registro</button>
      </div>
    </div>

    <div class="dashboard__stats">
      ${statCard("Total registrados", pad(total))}
      ${statCard("Cupos presenciales", `${pad(presenciales)} / ${CUPOS_PRESENCIALES}`)}
      ${statCard("Confirmados", pad(confirmados))}
    </div>

    <div class="dashboard__panels">
      <div class="dashboard__panel">
        <h3 class="dashboard__panel-title">Por estado</h3>
        ${panelRow("Pendientes", pendientes)}
        ${panelRow("Confirmados", confirmados)}
        ${panelRow("Cancelados", cancelados)}
      </div>
      <div class="dashboard__panel">
        <h3 class="dashboard__panel-title">Por tipo</h3>
        ${panelRow("Presencial", presenciales)}
        ${panelRow("Virtual", virtuales)}
      </div>
    </div>
  `;

  document.getElementById("btn-nuevo").addEventListener("click", () => openModal("modal-form"));
  document.getElementById("btn-ver-lista").addEventListener("click", () => openModal("modal-list"));
}

function statCard(label, value) {
  return `
    <div class="dashboard__stat">
      <span class="dashboard__stat-label">${label}</span>
      <span class="dashboard__stat-value">${value}</span>
    </div>
  `;
}

function panelRow(label, value) {
  return `
    <div class="dashboard__row">
      <span>${label}</span>
      <span class="dashboard__row-value">${pad(value)}</span>
    </div>
  `;
}

function pad(numero) {
  return String(numero).padStart(2, "0");
}
