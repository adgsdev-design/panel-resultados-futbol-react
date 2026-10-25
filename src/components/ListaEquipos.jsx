import Escudo from './Escudo.jsx';

// Muestra los equipos registrados en tarjetas
function ListaEquipos({ equipos }) {
  return (
    <section className="panel">
      <h2>Equipos</h2>
      <div className="grid-equipos">
        {equipos.map((equipo) => (
          <article key={equipo.id} className="tarjeta-equipo" style={{ borderTopColor: equipo.colorPrimario }}>
            <Escudo equipo={equipo} tamano={56} />
            <h3>{equipo.nombre}</h3>
            <span className="id-equipo">ID #{equipo.id}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListaEquipos;
