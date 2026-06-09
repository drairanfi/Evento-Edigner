import { seed } from "../data/seed.js";

export const registros = [...seed];

export function addRecord(registro) {
  const id = registros.reduce((max, r) => Math.max(max, r.id), 0) + 1;
  registros.push({ ...registro, id });
}

export function deleteRecord(id) {
  const index = registros.findIndex((r) => r.id === id);
  if (index !== -1) registros.splice(index, 1);
}

export function changeStatus(id, estado) {
  const registro = registros.find((r) => r.id === id);
  if (registro) registro.estado = estado;
}
