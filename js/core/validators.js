const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_TEXTO_LIBRE = 20;

export function validateRegistro(registro) {
  const errors = {};

  const nombre = registro.nombre.trim();
  if (!nombre) errors.nombre = "El nombre es obligatorio.";
  else if (nombre.length < 3) errors.nombre = "Mínimo 3 caracteres.";
  else if (nombre.length > MAX_TEXTO_LIBRE) errors.nombre = `Máximo ${MAX_TEXTO_LIBRE} caracteres.`;

  const email = registro.email.trim();
  if (!email) errors.email = "El correo es obligatorio.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "El correo no tiene un formato válido.";

  const cargo = registro.cargo.trim();
  if (!cargo) errors.cargo = "El cargo es obligatorio.";
  else if (cargo.length > MAX_TEXTO_LIBRE) errors.cargo = `Máximo ${MAX_TEXTO_LIBRE} caracteres.`;

  if (!registro.area) errors.area = "Selecciona un área.";

  if (!registro.tipoAsistencia) errors.tipoAsistencia = "Selecciona un tipo de asistencia.";

  if (registro.tipoAsistencia === "presencial" && !registro.tallaCamisa) {
    errors.tallaCamisa = "Selecciona una talla.";
  }

  if (registro.tipoAsistencia === "virtual") {
    const plataforma = registro.plataforma.trim();
    if (!plataforma) errors.plataforma = "La plataforma es obligatoria.";
    else if (plataforma.length > MAX_TEXTO_LIBRE) errors.plataforma = `Máximo ${MAX_TEXTO_LIBRE} caracteres.`;
  }

  return errors;
}
