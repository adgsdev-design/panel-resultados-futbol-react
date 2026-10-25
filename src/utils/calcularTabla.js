// Calcula la tabla de posiciones a partir de la lista de equipos y partidos.
// Victoria = 3 puntos, empate = 1, derrota = 0.
export function calcularTabla(equipos, partidos) {
  // Estadísticas iniciales en cero para cada equipo (reduce -> objeto indexado por id)
  const inicial = equipos.reduce((acc, equipo) => {
    acc[equipo.id] = {
      equipo,
      pj: 0, pg: 0, pe: 0, pp: 0,
      gf: 0, gc: 0, dg: 0, pts: 0,
    };
    return acc;
  }, {});

  // Recorre los partidos acumulando los resultados de local y visitante
  const estadisticas = partidos.reduce((acc, partido) => {
    const local = acc[partido.localId];
    const visitante = acc[partido.visitanteId];
    if (!local || !visitante) return acc;

    local.pj += 1;
    visitante.pj += 1;
    local.gf += partido.golesLocal;
    local.gc += partido.golesVisitante;
    visitante.gf += partido.golesVisitante;
    visitante.gc += partido.golesLocal;

    if (partido.golesLocal > partido.golesVisitante) {
      local.pg += 1;
      local.pts += 3;
      visitante.pp += 1;
    } else if (partido.golesLocal < partido.golesVisitante) {
      visitante.pg += 1;
      visitante.pts += 3;
      local.pp += 1;
    } else {
      local.pe += 1;
      visitante.pe += 1;
      local.pts += 1;
      visitante.pts += 1;
    }
    return acc;
  }, inicial);

  // Diferencia de goles y orden: puntos, diferencia de goles, goles a favor
  return Object.values(estadisticas)
    .map((fila) => ({ ...fila, dg: fila.gf - fila.gc }))
    .sort((a, b) =>
      b.pts - a.pts ||
      b.dg - a.dg ||
      b.gf - a.gf ||
      a.equipo.nombre.localeCompare(b.equipo.nombre)
    );
}
