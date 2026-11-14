// src/TrafficLightsContext.jsx
import { createContext, useState, useEffect } from 'react';

// Створюємо контекст
export const TrafficLightsContext = createContext();

const CYCLE = ['red', 'yellow', 'green', 'yellow'];

// Провайдер, який огорне весь наш застосунок
export function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [stats, setStats] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');
  const [isAutomatic, setIsAutomatic] = useState(false);

  const currentSignal = CYCLE[phaseIndex];

  // Ефект таймера переїхав сюди!
  useEffect(() => {
    if (!isAutomatic) return;

    const timerId = setInterval(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % CYCLE.length);
    }, 1500);

    return () => clearInterval(timerId);
  }, [isAutomatic]);

  // Дії предметної області
  const handleLightClick = (color) => {
    if (isAutomatic) return;

    setStats((prevStats) => ({
      ...prevStats,
      [color]: prevStats[color] + 1
    }));

    if (color === 'red') setPhaseIndex(0);
    else if (color === 'green') setPhaseIndex(2);
    else if (color === 'yellow') setPhaseIndex(1);
  };

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === 'vertical' ? 'horizontal' : 'vertical'));
  };

  const startAuto = () => setIsAutomatic(true);
  const stopAuto = () => setIsAutomatic(false);

  // Усі дані та функції, які ми надаємо дочірнім компонентам
  const value = {
    currentSignal,
    stats,
    orientation,
    isAutomatic,
    handleLightClick,
    toggleOrientation,
    startAuto,
    stopAuto
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}