import { useState } from 'react';
import ResultadoPartido from './ResultadoPartido.jsx';

// Lista de partidos registrados con filtro por equipo y botón de eliminar
function HistorialPartidos({ equipos, partidos, onEliminar }) {
  const [equipoFiltro, setEquipoFiltro] = useState('');

  const buscarEquipo = (id) => equipos.find((equipo) => equipo.id === id);

  const partidosFiltrados = equipoFiltro
    ? partidos.filter(
        (partido) =>
          partido.localId === Number(equipoFiltro) || partido.visitanteId === Number(equipoFiltro)
      )
    : partidos;

  return (
    <section className="panel">
      <div className="encabezado-panel">
        <h2>Historial de resultados</h2>
        <label className="filtro">
          Filtrar por equipo
          <select value={equipoFiltro} onChange={(e) => setEquipoFiltro(e.target.value)}>
            <option value="">Todos</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
            ))}
          </select>
        </label>
      </div>

      {partidos.length === 0 ? (
        <p className="mensaje-vacio">Aún no hay partidos registrados.</p>
      ) : partidosFiltrados.length === 0 ? (
        <p className="mensaje-vacio">Este equipo no tiene partidos registrados.</p>
      ) : (
        <ul className="lista-partidos">
          {partidosFiltrados.map((partido) => (
            <li key={partido.id} className="item-partido">
              <ResultadoPartido
                local={buscarEquipo(partido.localId)}
                visitante={buscarEquipo(partido.visitanteId)}
                golesLocal={partido.golesLocal}
                golesVisitante={partido.golesVisitante}
              />
              <button
                type="button"
                className="boton-eliminar"
                onClick={() => onEliminar(partido.id)}
                aria-label="Eliminar resultado"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HistorialPartidos;
