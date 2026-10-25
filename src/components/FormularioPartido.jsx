import { useState } from 'react';
import ResultadoPartido from './ResultadoPartido.jsx';

const formularioInicial = { localId: '', visitanteId: '', golesLocal: '', golesVisitante: '' };

// Valida que el valor sea un número entero no negativo
function esEnteroNoNegativo(valor) {
  return /^\d+$/.test(String(valor).trim());
}

// Formulario para registrar el resultado de un partido
function FormularioPartido({ equipos, onRegistrar }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState([]);
  const [ultimoPartido, setUltimoPartido] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    setErrores([]);
  };

  const validar = () => {
    const lista = [];
    if (!formulario.localId) lista.push('Selecciona el equipo local.');
    if (!formulario.visitanteId) lista.push('Selecciona el equipo visitante.');
    if (formulario.localId && formulario.localId === formulario.visitanteId) {
      lista.push('El equipo local y el visitante no pueden ser el mismo.');
    }
    if (!esEnteroNoNegativo(formulario.golesLocal)) {
      lista.push('Los goles del local deben ser un número entero no negativo.');
    }
    if (!esEnteroNoNegativo(formulario.golesVisitante)) {
      lista.push('Los goles del visitante deben ser un número entero no negativo.');
    }
    return lista;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const lista = validar();
    if (lista.length > 0) {
      setErrores(lista);
      return;
    }
    const partido = {
      id: Date.now(),
      localId: Number(formulario.localId),
      visitanteId: Number(formulario.visitanteId),
      golesLocal: parseInt(formulario.golesLocal, 10),
      golesVisitante: parseInt(formulario.golesVisitante, 10),
    };
    onRegistrar(partido);
    setUltimoPartido(partido);
    setFormulario(formularioInicial);
  };

  const buscarEquipo = (id) => equipos.find((equipo) => equipo.id === id);

  return (
    <section className="panel">
      <h2>Registrar partido</h2>
      <form className="formulario" onSubmit={manejarEnvio} noValidate>
        <div className="fila-form">
          <label>
            Equipo local
            <select name="localId" value={formulario.localId} onChange={manejarCambio}>
              <option value="">-- Seleccionar --</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
              ))}
            </select>
          </label>
          <label className="campo-goles">
            Goles
            <input
              type="number"
              name="golesLocal"
              min="0"
              step="1"
              value={formulario.golesLocal}
              onChange={manejarCambio}
              placeholder="0"
            />
          </label>
        </div>

        <div className="vs">VS</div>

        <div className="fila-form">
          <label>
            Equipo visitante
            <select name="visitanteId" value={formulario.visitanteId} onChange={manejarCambio}>
              <option value="">-- Seleccionar --</option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
              ))}
            </select>
          </label>
          <label className="campo-goles">
            Goles
            <input
              type="number"
              name="golesVisitante"
              min="0"
              step="1"
              value={formulario.golesVisitante}
              onChange={manejarCambio}
              placeholder="0"
            />
          </label>
        </div>

        {errores.length > 0 && (
          <ul className="errores">
            {errores.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="boton-primario">Registrar resultado</button>
      </form>

      {ultimoPartido && (
        <div className="ultimo-partido">
          <p>Último resultado registrado:</p>
          <ResultadoPartido
            local={buscarEquipo(ultimoPartido.localId)}
            visitante={buscarEquipo(ultimoPartido.visitanteId)}
            golesLocal={ultimoPartido.golesLocal}
            golesVisitante={ultimoPartido.golesVisitante}
          />
        </div>
      )}
    </section>
  );
}

export default FormularioPartido;
