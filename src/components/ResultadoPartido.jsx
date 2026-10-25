import Escudo from './Escudo.jsx';

// Muestra un partido con escudos, nombres y marcador
function ResultadoPartido({ local, visitante, golesLocal, golesVisitante }) {
  return (
    <div className="resultado">
      <div className="resultado-equipo">
        <Escudo equipo={local} tamano={40} />
        <span>{local.nombre}</span>
      </div>
      <div className="marcador">
        {golesLocal} <span>-</span> {golesVisitante}
      </div>
      <div className="resultado-equipo visitante">
        <Escudo equipo={visitante} tamano={40} />
        <span>{visitante.nombre}</span>
      </div>
    </div>
  );
}

export default ResultadoPartido;
