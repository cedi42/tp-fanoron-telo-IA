import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Board from "../components/Board";

const initialBoard = {
  a1: null, b1: null, c1: null,
  a2: null, b2: null, c2: null,
  a3: null, b3: null, c3: null,
};

const adjacency = {
  a1: ["a2", "b1", "b2"],
  b1: ["a1", "c1", "b2"],
  c1: ["b1", "c2", "b2"],
  a2: ["a1", "a3", "b2"],
  b2: ["a1", "a2", "a3", "b1", "b3", "c1", "c2", "c3"],
  c2: ["c1", "c3", "b2"],
  a3: ["a2", "b3", "b2"],
  b3: ["a3", "c3", "b2"],
  c3: ["b3", "c2", "b2"],
};

const winningLines = [
  ["a1", "b1", "c1"], ["a2", "b2", "c2"], ["a3", "b3", "c3"],
  ["a1", "a2", "a3"], ["b1", "b2", "b3"], ["c1", "c2", "c3"],
  ["a1", "b2", "c3"], ["c1", "b2", "a3"],
];

function checkWinner(board) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

export default function Game() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const mode      = location.state?.mode    ?? "pvp";
  const nameX     = location.state?.player1 ?? "Joueur X";
  const nameO     = location.state?.player2 ?? "Joueur O";

  const [board, setBoard]                 = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [selected, setSelected]           = useState(null);
  const [phase, setPhase]                 = useState("placement");
  const [placedPieces, setPlacedPieces]   = useState({ X: 0, O: 0 });

  const result  = checkWinner(board);
  const winner  = result?.player ?? null;
  const winLine = result?.line   ?? [];

  const playerName = (p) => p === "X" ? nameX : nameO;

  const handleNodeClick = (position) => {
    if (winner) return;

    if (phase === "placement") {
      if (board[position] !== null) return;
      const newBoard  = { ...board, [position]: currentPlayer };
      const newPlaced = { ...placedPieces, [currentPlayer]: placedPieces[currentPlayer] + 1 };
      setBoard(newBoard);
      setPlacedPieces(newPlaced);
      if (newPlaced.X + newPlaced.O === 6) setPhase("movement");
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      return;
    }

    if (board[position] === currentPlayer) { setSelected(position); return; }

    if (selected && board[position] === null && adjacency[selected].includes(position)) {
      setBoard({ ...board, [position]: currentPlayer, [selected]: null });
      setSelected(null);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setSelected(null);
    setPhase("placement");
    setPlacedPieces({ X: 0, O: 0 });
  };

  const modeLabel = { pvp: "Humain vs Humain", pve: "Humain vs IA", eve: "IA vs IA" }[mode];

  return (
    <div className="game">
      <div className="game__header">
        <h1 className="game__title">Fanoron-Telo</h1>
        <p className="game__mode">{modeLabel}</p>
      </div>

      {winner ? (
        <div className="game__winner">
          🏆 Victoire : {playerName(winner)}
        </div>
      ) : (
        <div className="game__status">
          <span>
            Phase :{" "}
            <span className="game__badge">
              {phase === "placement" ? "Placement" : "Mouvement"}
            </span>
          </span>
          <span>
            Tour :{" "}
            <span className="game__player">{playerName(currentPlayer)}</span>
          </span>
        </div>
      )}

      <div className="game__scoreboard">
        <div className={`game__score-card${currentPlayer === "X" && !winner ? " game__score-card--active" : ""}`}>
          <div className="game__score-pion game__score-pion--x" />
          <div>
            <div className="game__score-name">{nameX}</div>
            <div className="game__score-count">{placedPieces.X}/3 pions</div>
          </div>
        </div>
        <div className="game__score-vs">vs</div>
        <div className={`game__score-card${currentPlayer === "O" && !winner ? " game__score-card--active" : ""}`}>
          <div className="game__score-pion game__score-pion--o" />
          <div>
            <div className="game__score-name">{nameO}</div>
            <div className="game__score-count">{placedPieces.O}/3 pions</div>
          </div>
        </div>
      </div>

      <Board
        board={board}
        selected={selected}
        onNodeClick={handleNodeClick}
        winLine={winLine}
      />

      <div className="game__actions">
        <button className="game__btn game__btn--back" onClick={() => navigate("/")}>
          ← Menu
        </button>
        <button className="game__btn" onClick={resetGame}>
          ↺ Recommencer
        </button>
      </div>
    </div>
  );
}
