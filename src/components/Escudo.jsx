// Escudo propio dibujado en SVG con los colores e iniciales del equipo
function Escudo({ equipo, tamano = 48 }) {
  return (
    <svg
      className="escudo"
      width={tamano}
      height={tamano * 1.15}
      viewBox="0 0 100 115"
      role="img"
      aria-label={`Escudo de ${equipo.nombre}`}
    >
      <path
        d="M50 4 L94 18 L90 64 C86 88 68 104 50 111 C32 104 14 88 10 64 L6 18 Z"
        fill={equipo.colorPrimario}
        stroke={equipo.colorSecundario}
        strokeWidth="6"
      />
      <path d="M10 40 L90 40 L89 52 L11 52 Z" fill={equipo.colorSecundario} opacity="0.85" />
      <text
        x="50"
        y="88"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill={equipo.colorSecundario}
      >
        {equipo.iniciales}
      </text>
    </svg>
  );
}

export default Escudo;
