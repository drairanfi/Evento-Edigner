export function initModals() {
  const cerradores = document.querySelectorAll("[data-close]");
  cerradores.forEach((el) => {
    el.addEventListener("click", closeAll);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
}

export function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = false;
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = true;
}

function closeAll() {
  const modales = document.querySelectorAll(".modal");
  modales.forEach((modal) => {
    modal.hidden = true;
  });
}
