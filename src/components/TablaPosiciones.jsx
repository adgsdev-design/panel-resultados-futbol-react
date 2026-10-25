import Escudo from './Escudo.jsx';
import { calcularTabla } from '../utils/calcularTabla.js';

// Tabla de posiciones calculada a partir de los partidos registrados
function TablaPosiciones({ equipos, partidos }) {
  const tabla = calcularTabla(equipos, partidos);

  return (
    <section className="panel">
      <h2>Tabla de posiciones</h2>
      {partidos.length === 0 && (
        <p className="mensaje-vacio">No hay partidos registrados: todos los equipos están en cero.</p>
      )}
      <div className="contenedor-tabla">
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th className="col-equipo">Equipo</th>
              <th title="Partidos jugados">PJ</th>
              <th title="Partidos ganados">PG</th>
              <th title="Partidos empatados">PE</th>
              <th title="Partidos perdidos">PP</th>
              <th title="Goles a favor">GF</th>
              <th title="Goles en contra">GC</th>
              <th title="Diferencia de goles">DG</th>
              <th title="Puntos">PTS</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((fila, indice) => (
              <tr key={fila.equipo.id}>
                <td>{indice + 1}</td>
                <td className="col-equipo">
                  <div className="celda-equipo">
                    <Escudo equipo={fila.equipo} tamano={26} />
                    <span>{fila.equipo.nombre}</span>
                  </div>
                </td>
                <td>{fila.pj}</td>
                <td>{fila.pg}</td>
                <td>{fila.pe}</td>
                <td>{fila.pp}</td>
                <td>{fila.gf}</td>
                <td>{fila.gc}</td>
                <td>{fila.dg > 0 ? `+${fila.dg}` : fila.dg}</td>
                <td className="puntos">{fila.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="leyenda">Orden: puntos, diferencia de goles y goles a favor.</p>
    </section>
  );
}

export default TablaPosiciones;
