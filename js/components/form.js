import { addRecord } from "../core/store.js";
import { renderDashboard } from "./dashboard.js";
import { renderList } from "./list.js";
import { closeModal } from "./modal.js";
import { validateRegistro } from "../core/validators.js";

export function initForm() {
  const form = document.getElementById("event-form");
  if (!form) return;

  const grupoTalla = document.getElementById("grupo-talla");
  const grupoPlataforma = document.getElementById("grupo-plataforma");
  const radios = document.querySelectorAll('input[name="tipoAsistencia"]');


  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      grupoTalla.hidden = radio.value !== "presencial";
      grupoPlataforma.hidden = radio.value !== "virtual";
    });
  });

  form.addEventListener("reset", () => {
    grupoTalla.hidden = true;
    grupoPlataforma.hidden = true;
    limpiarErrores(form);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const registro = {
      nombre: (data.get("nombre") ?? "").trim(),
      email: (data.get("email") ?? "").trim(),
      cargo: (data.get("cargo") ?? "").trim(),
      area: data.get("area") ?? "",
      tipoAsistencia: data.get("tipoAsistencia") ?? "",
      tallaCamisa: data.get("tallaCamisa") ?? "",
      plataforma: (data.get("plataforma") ?? "").trim(),
      estado: "pendiente",
    };

    // 1) Validamos. Si hay errores, los pintamos y frenamos: no se guarda nada.
    const errors = validateRegistro(registro);
    pintarErrores(form, errors);
    if (Object.keys(errors).length > 0) return;

    // 2) Todo válido: recién acá guardamos y actualizamos la UI.
    addRecord(registro);
    renderDashboard();
    renderList();

    form.reset();
    closeModal("modal-form");
  });
}

// Pinta cada mensaje en su <span data-error="..."> y marca el input en rojo.
function pintarErrores(form, errors) {
  limpiarErrores(form);

  Object.entries(errors).forEach(([campo, mensaje]) => {
    const span = form.querySelector(`[data-error="${campo}"]`);
    if (span) span.textContent = mensaje;

    const input = form.querySelector(`[name="${campo}"]`);
    if (input) input.classList.add("form__input--invalid");
  });
}

// Borra todos los mensajes y quita las marcas rojas.
function limpiarErrores(form) {
  form.querySelectorAll("[data-error]").forEach((span) => {
    span.textContent = "";
  });
  form.querySelectorAll(".form__input--invalid").forEach((input) => {
    input.classList.remove("form__input--invalid");
  });
}
