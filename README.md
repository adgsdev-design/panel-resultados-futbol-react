# Panel de resultados de fútbol (React)

Aplicación web para un torneo de fútbol aficionado: registra los marcadores de los partidos y calcula automáticamente la tabla de posiciones (PJ, PG, PE, PP, GF, GC, DG y puntos). No usa backend; los datos viven en memoria mientras la app está abierta.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (incluye npm).

## Cómo ejecutar

```bash
npm install
npm run dev
```

Luego abre en el navegador la dirección que aparece en la terminal (por defecto `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Funcionalidades

1. **Listado de equipos**: seis equipos con identificador único, nombre y escudo propio (dibujado en SVG con sus colores e iniciales), mostrados en tarjetas.
2. **Registro de partidos**: se eligen local y visitante, se escriben los goles y se valida que:
   - ambos equipos estén seleccionados y no sean el mismo;
   - los marcadores sean números enteros no negativos.
   Tras registrar, se muestra el resultado con escudos y nombres.
3. **Historial de resultados**: lista de todos los partidos, filtro por equipo y botón para eliminar cada resultado.
4. **Tabla de posiciones**: 3 puntos por victoria, 1 por empate y 0 por derrota. Ordenada por puntos, luego diferencia de goles y luego goles a favor.
5. **Interactividad**: la tabla se recalcula al registrar o eliminar un partido; hay mensajes cuando no existen partidos; el diseño se adapta a móviles (las columnas se apilan y la tabla permite desplazamiento horizontal).

## Estructura del proyecto

```
src/
├── main.jsx                   Punto de entrada; monta <App />
├── App.jsx                    Componente raíz y estado global
├── styles.css                 Estilos y reglas responsive
├── data/equipos.js            Datos de los seis equipos
├── utils/calcularTabla.js     Cálculo de la tabla (reduce, map, sort)
└── components/
    ├── Escudo.jsx             Escudo SVG de un equipo
    ├── ListaEquipos.jsx       Tarjetas de equipos
    ├── FormularioPartido.jsx  Formulario con validaciones
    ├── ResultadoPartido.jsx   Marcador con escudos y nombres
    ├── HistorialPartidos.jsx  Historial, filtro y eliminar
    └── TablaPosiciones.jsx    Tabla de posiciones
```

## Explicación de los componentes

| Componente | Responsabilidad |
|---|---|
| `App` | Guarda en `useState` la lista de equipos y la de partidos. Define `registrarPartido` (agrega un partido) y `eliminarPartido` (lo quita con `filter()`), y los pasa como props a los hijos. |
| `ListaEquipos` | Recorre los equipos con `map()` (key = `id`) y muestra una tarjeta por equipo. |
| `Escudo` | Dibuja un escudo SVG con los colores y las iniciales del equipo. Se reutiliza en tarjetas, resultados y tabla. |
| `FormularioPartido` | Formulario controlado: su propio `useState` guarda los valores, los errores y el último partido registrado. Usa `onChange` en cada campo y `onSubmit` para validar y enviar. |
| `ResultadoPartido` | Componente de presentación: escudos, nombres y marcador de un partido. |
| `HistorialPartidos` | Tiene un `useState` para el equipo del filtro; usa `filter()` para mostrar sólo los partidos de ese equipo y `onClick` en el botón **Eliminar**. Muestra un mensaje si no hay partidos. |
| `TablaPosiciones` | Llama a `calcularTabla()` en cada render, así siempre refleja los partidos actuales. |

## Manejo del estado

- **Estado global (en `App`)**: `equipos` y `partidos`. Es la única fuente de verdad; la tabla de posiciones **no** se guarda en el estado, sino que se *deriva* de `partidos` en cada render. Por eso, al registrar o eliminar un partido, React vuelve a renderizar y la tabla se actualiza sola.
- **Estado local**: el formulario guarda sus campos y errores; el historial guarda el filtro seleccionado. Este estado sólo le importa a cada componente.
- **Flujo de datos**: los datos bajan por *props* y los cambios suben por *callbacks* (`onRegistrar`, `onEliminar`). Las actualizaciones usan la forma funcional `setPartidos(anteriores => ...)` para no mutar el arreglo.

## Cálculo de la tabla (`calcularTabla.js`)

1. `reduce()` crea un objeto con las estadísticas en cero para cada equipo.
2. Otro `reduce()` recorre los partidos y suma PJ, GF, GC, y PG/PE/PP y puntos a local y visitante.
3. `map()` calcula la diferencia de goles (`GF - GC`).
4. `sort()` ordena por puntos, luego diferencia de goles, luego goles a favor (y por nombre si todo empata).

## Video de demostración

Guion sugerido (1–2 minutos):

1. Mostrar los seis equipos y la tabla en cero con el mensaje "No hay partidos registrados".
2. Intentar registrar un partido con el mismo equipo en ambos lados y con goles vacíos o negativos → se ven los errores.
3. Registrar 3 o 4 partidos válidos (incluido un empate) y mostrar cómo cambia la tabla después de cada uno.
4. Usar el filtro del historial para ver sólo los partidos de un equipo.
5. Eliminar un partido y mostrar que la tabla se recalcula.
6. Reducir el ancho de la ventana (o usar el modo móvil del navegador) para mostrar el diseño adaptable.
