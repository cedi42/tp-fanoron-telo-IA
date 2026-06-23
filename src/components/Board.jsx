export default function Board({ board, selected, onNodeClick, winLine = [] }) {
  const SIZE = 400;
  const PAD  = 50;
  const STEP = (SIZE - PAD * 2) / 2;

  const positions = {
    a3: [PAD,           PAD],
    b3: [PAD + STEP,    PAD],
    c3: [PAD + STEP*2,  PAD],

    a2: [PAD,           PAD + STEP],
    b2: [PAD + STEP,    PAD + STEP],
    c2: [PAD + STEP*2,  PAD + STEP],

    a1: [PAD,           PAD + STEP*2],
    b1: [PAD + STEP,    PAD + STEP*2],
    c1: [PAD + STEP*2,  PAD + STEP*2],
  };

  const E = PAD;
  const M = PAD + STEP;
  const F = PAD + STEP * 2;

  const lines = [
    [E, E,  F, E ],
    [E, M,  F, M ],
    [E, F,  F, F ],
    [E, E,  E, F ],
    [M, E,  M, F ],
    [F, E,  F, F ],
    [E, E,  F, F ],
    [F, E,  E, F ],
  ];

  const colLabels = ["a", "b", "c"];
  const rowLabels = ["1", "2", "3"];

  return (
    <svg
      className="board"
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Plateau de jeu Fanoron-Telo"
    >
      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          className="board__line"
          x1={x1} y1={y1} x2={x2} y2={y2}
        />
      ))}

      {colLabels.map((lbl, i) => (
        <text
          key={lbl}
          className="board__label"
          x={PAD + STEP * i}
          y={SIZE - 8}
          textAnchor="middle"
        >
          {lbl}
        </text>
      ))}
      {rowLabels.map((lbl, i) => (
        <text
          key={lbl}
          className="board__label"
          x={14}
          y={PAD + STEP * (2 - i) + 4}
          textAnchor="middle"
        >
          {lbl}
        </text>
      ))}

      {Object.entries(positions).map(([key, [x, y]]) => {
        const isSelected  = selected === key;
        const isWinNode   = winLine.includes(key);
        const piece       = board[key];
        const radius      = 18;

        return (
          <g
            key={key}
            className={`board__node${isSelected ? " board__node--selected" : ""}`}
            onClick={() => onNodeClick(key)}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {isWinNode && (
              <circle
                cx={x} cy={y} r={radius + 8}
                fill="none"
                stroke="#D4A843"
                strokeWidth="1.5"
                opacity="0.5"
              />
            )}

            <circle
              className="board__node-bg"
              cx={x} cy={y}
              r={isSelected ? radius + 4 : radius}
            />

            {piece === "X" && (
              <circle
                key={`${key}-x-${piece}`}
                className="board__piece-x"
                cx={x} cy={y} r={10}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            )}

            {piece === "O" && (
              <circle
                key={`${key}-o-${piece}`}
                className="board__piece-o"
                cx={x} cy={y} r={10}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
