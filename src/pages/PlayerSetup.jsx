import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MODE_CONFIG = {
  pvp: {
    label: "Humain vs Humain",
    players: [
      { key: "player1", label: "Joueur X", placeholder: "Ex : Rakoto", icon: "X" },
      { key: "player2", label: "Joueur O", placeholder: "Ex : Rabe",   icon: "O" },
    ],
  },
  pve: {
    label: "Humain vs IA",
    players: [
      { key: "player1", label: "Joueur X", placeholder: "Ton prénom", icon: "X" },
      { key: "player2", label: "IA",       placeholder: "IA",         icon: "O", fixed: true },
    ],
  },
  eve: {
    label: "IA vs IA",
    players: [
      { key: "player1", label: "IA 1", placeholder: "IA Alpha", icon: "X", fixed: true },
      { key: "player2", label: "IA 2", placeholder: "IA Beta",  icon: "O", fixed: true },
    ],
  },
};

export default function PlayerSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode     = location.state?.mode ?? "pvp";
  const config   = MODE_CONFIG[mode];

  const [names, setNames] = useState({
    player1: config.players[0].fixed ? config.players[0].placeholder : "",
    player2: config.players[1].fixed ? config.players[1].placeholder : "",
  });

  const handleSubmit = () => {
    const p1 = names.player1.trim() || config.players[0].placeholder;
    const p2 = names.player2.trim() || config.players[1].placeholder;
    navigate("/game", { state: { mode, player1: p1, player2: p2 } });
  };

  return (
    <div className="setup">
      <button className="setup__back" onClick={() => navigate("/")}>← Retour</button>

      <div className="setup__card">
        <p className="setup__mode">{config.label}</p>
        <h2 className="setup__title">Les Joueurs</h2>
        <div className="setup__divider" />

        <div className="setup__fields">
          {config.players.map((p) => (
            <div key={p.key} className="setup__field">
              <div className="setup__pion setup__pion--x" data-piece={p.icon}>
                {p.icon === "X"
                  ? <circle cx="20" cy="20" r="10" fill="#1a1a1a" />
                  : <circle cx="20" cy="20" r="10" fill="none" stroke="#F2E8D9" strokeWidth="2.5" />
                }
              </div>
              <div className="setup__field-body">
                <label className="setup__label">{p.label}</label>
                {p.fixed ? (
                  <div className="setup__fixed">{p.placeholder}</div>
                ) : (
                  <input
                    className="setup__input"
                    type="text"
                    maxLength={20}
                    placeholder={p.placeholder}
                    value={names[p.key]}
                    onChange={(e) => setNames({ ...names, [p.key]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    autoFocus={p.key === "player1"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="setup__start" onClick={handleSubmit}>
          Commencer la Partie →
        </button>
      </div>
    </div>
  );
}
