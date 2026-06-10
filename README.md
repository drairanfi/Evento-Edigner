# Evento Edigner bar's

App web sencilla para registrar asistentes a un evento. Hecha con **HTML, CSS y JavaScript puro** (sin frameworks).

Permite:

- Registrar personas con un formulario (nombre, correo, cargo, área, tipo de asistencia).
- Ver un dashboard con el resumen.
- Ver, buscar, filtrar y paginar la lista de registrados.
- Cambiar el estado de cada registro (pendiente, confirmado, cancelado) y eliminarlo.

## Cómo ejecutarlo

El proyecto usa módulos de JavaScript (`<script type="module">`), así que **NO sirve abrir el `index.html` con doble clic**. El navegador bloquea los módulos cuando se abren como archivo local.

En VS Code:

1. Instalá la extensión **Live Server**.
2. Abrí la carpeta del proyecto.
3. Click derecho sobre `index.html` → **Open with Live Server** (o el botón **Go Live** de la barra inferior).

Se abre solo en el navegador.

## Estructura del proyecto

```
.
├── index.html              # La página principal
├── css/                    # Estilos (uno por componente)
└── js/
    ├── main.js             # Punto de entrada: arranca toda la app
    ├── core/               # Lógica pura (NO toca el HTML)
    │   ├── store.js        #   Guarda los registros en memoria (agregar, borrar, cambiar estado)
    │   ├── validators.js   #   Reglas de validación del formulario
    │   └── businessRules.js#   Reglas del negocio (ej: máximo 20 cupos presenciales)
    ├── components/         # Lo que SÍ toca el HTML (el DOM)
    │   ├── form.js         #   El formulario de registro
    │   ├── list.js         #   La lista con búsqueda, filtros y paginación
    │   ├── dashboard.js    #   El resumen / tablero
    │   └── modal.js        #   Los modales (ventanas emergentes)
    └── data/
        └── seed.js         # Datos de ejemplo para arrancar
```

## La idea más importante: `core` vs `components`

Fijate que la lógica está separada en dos carpetas, y eso es a propósito:

- **`core/`** → responde **QUÉ** pasa. Son funciones puras: les pasás datos y te devuelven datos. No saben nada del HTML. Por eso son fáciles de leer y de probar.
- **`components/`** → responde **CÓMO** se ve. Acá se lee y se pinta el HTML, se escuchan los clics, etc. Usan a `core` para decidir qué mostrar.

Ejemplo: `validators.js` solo decide si un campo está mal y devuelve los errores. `form.js` es el que agarra esos errores y los muestra en pantalla. **El que valida no es el mismo que el que pinta.**

Mantené esa separación cuando agregues cosas nuevas: la regla va en `core/`, lo visual va en `components/`.

## Cosas a tener en cuenta

- **Los datos NO se guardan.** Todo vive en memoria (`store.js`). Si recargás la página, vuelve a los datos de ejemplo de `seed.js`.
- Hay un tope de **20 cupos presenciales** (`businessRules.js`). Cuando se llenan, el formulario lo avisa.
