import { registros, deleteRecord, changeStatus } from "../core/store.js";
import { renderDashboard } from "./dashboard.js";

const ESTADOS = ["pendiente", "confirmado", "cancelado"];

export function initList() {
  const container = document.getElementById("list-container");
  if (!container) return;

  container.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-eliminar]");
    if (!boton) return;
    deleteRecord(Number(boton.dataset.eliminar));
    renderList();
    renderDashboard();
  });

  container.addEventListener("change", (event) => {
    const select = event.target.closest("[data-estado]");
    if (!select) return;
    changeStatus(Number(select.dataset.estado), select.value);
    renderList();
    renderDashboard();
  });
}

export function renderList() {
  const container = document.getElementById("list-container");
  if (!container) return;
  container.innerHTML = registros.map(cardHTML).join("");
}

function cardHTML(r) {
  return `
    <article class="list__card" data-id="${r.id}">
      <div class="list__info">
        <h3 class="list__name">${escapeHTML(r.nombre)}</h3>
        <p class="list__meta">${escapeHTML(r.cargo)} · ${escapeHTML(r.area)}</p>
        <p class="list__meta">${escapeHTML(r.email)}</p>
        <span class="list__badge">${escapeHTML(r.tipoAsistencia)}</span>
      </div>
      <div class="list__controls">
        <select class="form__select" data-estado="${r.id}">
          ${ESTADOS.map((estado) => statusOption(estado, r.estado)).join("")}
        </select>
        <button type="button" class="form__button form__button--secondary" data-eliminar="${r.id}">
          Eliminar
        </button>
      </div>
    </article>
  `;
}

function statusOption(estado, actual) {
  const seleccionado = estado === actual ? "selected" : "";
  return `<option value="${estado}" ${seleccionado}>${estado}</option>`;
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
