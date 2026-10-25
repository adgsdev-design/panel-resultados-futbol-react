import { useState } from 'react';
import equiposIniciales from './data/equipos.js';
import ListaEquipos from './components/ListaEquipos.jsx';
import FormularioPartido from './components/FormularioPartido.jsx';
import HistorialPartidos from './components/HistorialPartidos.jsx';
import TablaPosiciones from './components/TablaPosiciones.jsx';

// Componente principal: guarda el estado de equipos y partidos en memoria
function App() {
  const [equipos] = useState(equiposIniciales);
  const [partidos, setPartidos] = useState([]);

  const registrarPartido = (partido) => {
    setPartidos((anteriores) => [partido, ...anteriores]);
  };

  const eliminarPartido = (id) => {
    setPartidos((anteriores) => anteriores.filter((partido) => partido.id !== id));
  };

  return (
    <div className="app">
      <header className="cabecera">
        <h1>⚽ Torneo Aficionado</h1>
        <p>Panel de resultados y tabla de posiciones</p>
      </header>

      <main className="contenido">
        <ListaEquipos equipos={equipos} />
        <div className="columnas">
          <FormularioPartido equipos={equipos} onRegistrar={registrarPartido} />
          <TablaPosiciones equipos={equipos} partidos={partidos} />
        </div>
        <HistorialPartidos equipos={equipos} partidos={partidos} onEliminar={eliminarPartido} />
      </main>

      <footer className="pie">Datos en memoria · React + Hooks</footer>
    </div>
  );
}

export default App;
