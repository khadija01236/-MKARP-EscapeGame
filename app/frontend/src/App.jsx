import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

import { LEVEL_BRIEFING, LEVEL_TEMPLATES } from './constants/levels.js';
import { buildPerLevelSummary } from './utils/time.js';
import { runLevel } from './services/backendApi.js';

import { GameScreen } from './components/screens/GameScreen.jsx';
import { HomeScreen } from './components/screens/HomeScreen.jsx';
import { IntroScreen } from './components/screens/IntroScreen.jsx';
import { LoseScreen } from './components/screens/LoseScreen.jsx';
import { WinScreen } from './components/screens/WinScreen.jsx';

function App() {
  const GAME_DURATION_SECONDS = 600;

  const [code, setCode] = useState(LEVEL_TEMPLATES[1]);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [output, setOutput] = useState('');
  const [inputFlag, setInputFlag] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [expectedFlag, setExpectedFlag] = useState(null);
  const [levelSuccessTimes, setLevelSuccessTimes] = useState([]); // [{ level: number, at: secondsElapsed }]

  // --- LOGIQUE DU TIMER ---
  useEffect(() => {
    if (!gameStarted || gameFinished || gameLost) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameLost(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameFinished, gameLost]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameFinished(false);
    setGameLost(false);
    setShowIntro(false);
    setLevel(1);
    setTimeLeft(GAME_DURATION_SECONDS);
    setCode(LEVEL_TEMPLATES[1]);
    setOutput('');
    setInputFlag('');
    setExpectedFlag(null);
    setLevelSuccessTimes([]);
  }, []);

  const goToIntro = useCallback(() => {
    setShowIntro(true);
    setGameStarted(false);
    setGameFinished(false);
    setGameLost(false);
    setOutput('');
    setInputFlag('');
    setExpectedFlag(null);
    setLevelSuccessTimes([]);
  }, []);

  const returnToHome = useCallback(() => {
    const ok = window.confirm(
      'Quitter la partie et revenir à l\'accueil ?\n\nProgression non sauvegardée.'
    );
    if (!ok) return;

    setGameStarted(false);
    setShowIntro(false);
    setGameFinished(false);
    setGameLost(false);
    setOutput('');
    setInputFlag('');
    setExpectedFlag(null);
    setLevelSuccessTimes([]);
  }, []);

  // --- ACTIONS ---
  const runCode = useCallback(async () => {
    setOutput('Exécution des tests unitaires en cours...');
    try {
      const data = await runLevel({ code, level });
      const responseOutput = typeof data?.output === 'string' ? data.output : '';
      setOutput(responseOutput);

      if (data?.success) {
        setExpectedFlag(data.flag);
        setOutput((prev) => prev + `\n\n✅ SUCCÈS ! FLAG GÉNÉRÉ : ${data.flag}`);
      }
    } catch (err) {
      const serverOutput = err?.response?.data?.output;
      if (typeof serverOutput === 'string' && serverOutput.trim()) {
        setOutput(serverOutput);
      } else {
        setOutput('ERREUR : Impossible de contacter le serveur backend (port 5000).');
      }
    }
  }, [code, level]);

  const checkFlag = useCallback(() => {
    const entered = (inputFlag || '').trim();
    if (!expectedFlag) {
      alert('Aucun flag attendu : exécute le patch pour générer le flag.');
      return;
    }

    // Vérifie si le flag entré correspond au dernier flag généré pour ce niveau
    if (entered === expectedFlag) {
      const successAt = Math.max(0, GAME_DURATION_SECONDS - timeLeft);
      setLevelSuccessTimes((prev) => {
        const next = prev.filter((t) => t.level !== level);
        next.push({ level, at: successAt });
        next.sort((a, b) => a.level - b.level);
        return next;
      });

      if (level < 10) {
        const nextLevel = level + 1;
        const nextLevelString = nextLevel.toString().padStart(2, '0');
        setLevel(nextLevel);
        setInputFlag('');
        setExpectedFlag(null);
        setOutput(`ACCÈS NIVEAU ${nextLevelString} AUTORISÉ...`);
        setCode(LEVEL_TEMPLATES[nextLevel]);
      } else {
        setGameFinished(true);
      }
    } else {
      alert("FLAG INVALIDE.");
    }
  }, [expectedFlag, inputFlag, level, timeLeft]);

  const totalElapsed = useMemo(() => Math.max(0, GAME_DURATION_SECONDS - timeLeft), [timeLeft]);

  const { sorted: sortedSuccessTimes, perLevelSummary } = useMemo(
    () => buildPerLevelSummary(levelSuccessTimes),
    [levelSuccessTimes]
  );

  const previousLevelSolvedAt = useMemo(
    () => sortedSuccessTimes.find((t) => t.level === level - 1)?.at ?? 0,
    [level, sortedSuccessTimes]
  );

  const currentLevelElapsed = useMemo(
    () => Math.max(0, totalElapsed - previousLevelSolvedAt),
    [previousLevelSolvedAt, totalElapsed]
  );

  const finalTotalTime = useMemo(
    () => (gameLost ? GAME_DURATION_SECONDS : (sortedSuccessTimes.find((t) => t.level === 10)?.at ?? totalElapsed)),
    [gameLost, sortedSuccessTimes, totalElapsed]
  );

  const finalScoreOutOf10 = useMemo(
    () => (gameFinished ? 10 : Math.min(10, sortedSuccessTimes.length)),
    [gameFinished, sortedSuccessTimes.length]
  );

  const levelString = useMemo(() => level.toString().padStart(2, '0'), [level]);

  const screenKey = useMemo(() => {
    if (gameFinished) return 'win';
    if (gameLost) return 'lose';
    if (showIntro) return 'intro';
    if (!gameStarted) return 'home';
    return 'game';
  }, [gameFinished, gameLost, gameStarted, showIntro]);

  const briefing = LEVEL_BRIEFING[level] ?? {
    title: `Niveau ${levelString}`,
    text: 'Patch le module et récupère le flag pour continuer.',
  };

  // --- RENDU (UI) ---
  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#00ff00', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' }}>
      <div className="screenRoot" key={screenKey}>

      {gameFinished ? (
        <WinScreen
          score={finalScoreOutOf10}
          totalTimeSeconds={finalTotalTime}
          perLevelSummary={perLevelSummary}
          onReturn={returnToHome}
        />
      ) : gameLost ? (
        <LoseScreen
          score={finalScoreOutOf10}
          finalTimeSeconds={finalTotalTime}
          perLevelSummary={perLevelSummary}
          onReturn={returnToHome}
        />
      ) : (!gameStarted && !showIntro) ? (
        <HomeScreen onLaunch={goToIntro} />
      ) : showIntro ? (
        <IntroScreen onStart={startGame} onReturn={returnToHome} />
      ) : (
        <GameScreen
          levelString={levelString}
          timeLeftSeconds={timeLeft}
          currentLevelElapsedSeconds={currentLevelElapsed}
          briefing={briefing}
          code={code}
          onCodeChange={setCode}
          output={output}
          inputFlag={inputFlag}
          onInputFlagChange={setInputFlag}
          onRunCode={runCode}
          onCheckFlag={checkFlag}
          onReturn={returnToHome}
        />
      )}

      </div>
    </div>
  );
}

export default App;