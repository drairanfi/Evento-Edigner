export const CUPOS_PRESENCIALES = 20;

export function contarPresenciales(registros) {
  return registros.filter((r) => r.tipoAsistencia === "presencial").length;
}

export function hayCupoPresencial(registros) {
  return contarPresenciales(registros) < CUPOS_PRESENCIALES;
}
