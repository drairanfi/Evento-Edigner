import { registros, deleteRecord, changeStatus } from "../core/store.js";
import { renderDashboard } from "./dashboard.js";

const ESTADOS = ["pendiente", "confirmado", "cancelado"];
let pagina = 1;

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

  ["list-search", "filter-tipo", "filter-estado"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      pagina = 1;
      renderList();
    });
  });

  document.getElementById("list-pagination").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-pagina]");
    if (!btn) return;
    pagina = Number(btn.dataset.pagina);
    renderList();
  });
}

export function renderList() {
  const container = document.getElementById("list-container");
  if (!container) return;

  const texto = document.getElementById("list-search").value.toLowerCase();
  const tipo = document.getElementById("filter-tipo").value;
  const estado = document.getElementById("filter-estado").value;

  const filtrados = registros.filter((r) =>
    r.nombre.toLowerCase().includes(texto) &&
    (tipo === "" || r.tipoAsistencia === tipo) &&
    (estado === "" || r.estado === estado)
  );

  const inicio = (pagina - 1) * 10;
  const visibles = filtrados.slice(inicio, inicio + 10);

  container.innerHTML = visibles.map(cardHTML).join("");
  renderPaginas(filtrados.length);
}

function renderPaginas(total) {
  const cont = document.getElementById("list-pagination");
  const paginas = Math.ceil(total / 10);

  if (paginas <= 1) {
    cont.innerHTML = "";
    return;
  }

  let html = "";
  for (let i = 1; i <= paginas; i++) {
    const activa = i === pagina ? "list__page--active" : "";
    html += `<button type="button" class="list__page ${activa}" data-pagina="${i}">${i}</button>`;
  }
  cont.innerHTML = html;
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
