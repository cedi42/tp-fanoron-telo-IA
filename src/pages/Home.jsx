import { useNavigate } from "react-router-dom";

function IconSwords() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5M16.5 15.5l1.667 1.833L21 15l-1.833-1.667M3.5 20.5l2.5-2.5M10 14l-6.5 6.5"/>
    </svg>
  );
}

function IconRobot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2"/>
      <path d="M12 2v6M8 8V6M16 8V6"/>
      <circle cx="9" cy="14" r="1.5"/>
      <circle cx="15" cy="14" r="1.5"/>
    </svg>
  );
}

function IconBrain() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6H8.3A7 7 0 0 1 5 12a7 7 0 0 1 7-7z"/>
      <path d="M12 5v14M8.5 8.5C7 9.5 6 11 6 12M15.5 8.5C17 9.5 18 11 18 12"/>
    </svg>
  );
}

const TITLE = "Fanoron-Telo";
// emblème : 0.0s → 0.8s
// lettres  : commencent à 0.9s, espacées de 0.06s
const EMBLEM_DURATION = 0.9;
const LETTER_DELAY    = 0.06;

export default function Home() {
  const navigate = useNavigate();

  const goToSetup = (mode) => {
    navigate("/setup", { state: { mode } });
  };

  // délai après la fin des lettres
  const lastLetterEnd = EMBLEM_DURATION + TITLE.length * LETTER_DELAY;
  const subDelay      = lastLetterEnd + 0.1;
  const dividerDelay  = subDelay + 0.2;
  const btn1Delay     = dividerDelay + 0.25;
  const btn2Delay     = btn1Delay + 0.15;
  const btn3Delay     = btn2Delay + 0.15;

  return (
    <div className="home">
      <svg className="home__emblem" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="4" stroke="#8B2500" strokeWidth="1.5"/>
        <line x1="8"  y1="32" x2="56" y2="32" stroke="#6B3A1F" strokeWidth="1"/>
        <line x1="32" y1="8"  x2="32" y2="56" stroke="#6B3A1F" strokeWidth="1"/>
        <line x1="8"  y1="8"  x2="56" y2="56" stroke="#6B3A1F" strokeWidth="1"/>
        <line x1="56" y1="8"  x2="8"  y2="56" stroke="#6B3A1F" strokeWidth="1"/>
        {[8,32,56].map(x => [8,32,56].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#5A3018" stroke="#D4A843" strokeWidth="1"/>
        )))}
      </svg>

      <h1 className="home__title" aria-label={TITLE}>
        {TITLE.split("").map((char, i) => (
          <span
            key={i}
            className="home__letter"
            style={{ animationDelay: `${EMBLEM_DURATION + i * LETTER_DELAY}s` }}
          >
            {char === "-" ? "\u2011" : char}
          </span>
        ))}
      </h1>

      <p className="home__sub" style={{ animationDelay: `${subDelay}s` }}>
        Jeu Traditionnel Malgache
      </p>

      <hr className="home__divider" style={{ animationDelay: `${dividerDelay}s` }} />

      <nav className="home__menu">
        <button className="home__btn" style={{ animationDelay: `${btn1Delay}s` }} onClick={() => goToSetup("pvp")}>
          <IconSwords />
          Humain vs Humain
        </button>
        <button className="home__btn" style={{ animationDelay: `${btn2Delay}s` }} onClick={() => goToSetup("pve")}>
          <IconBrain />
          Humain vs IA
        </button>
        <button className="home__btn" style={{ animationDelay: `${btn3Delay}s` }} onClick={() => goToSetup("eve")}>
          <IconRobot />
          IA vs IA
        </button>
      </nav>
    </div>
  );
}
