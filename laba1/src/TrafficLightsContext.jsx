import { createContext, useState, useEffect } from 'react';
import { listTrafficLights, updateTrafficLightState } from './api/trafficLightsApi';

export const TrafficLightsContext = createContext();
const CYCLE = ['red', 'yellow', 'green', 'yellow'];

export function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [stats, setStats] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');
  const [isAutomatic, setIsAutomatic] = useState(false);

  // Нові стани для сервера
  const [loadStatus, setLoadStatus] = useState('idle'); // idle, loading, success, error
  const [loadError, setLoadError] = useState(null);
  
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success, error
  const [saveError, setSaveError] = useState(null);

  const currentSignal = CYCLE[phaseIndex];

  // Функція завантаження з сервера
  const reloadTrafficLights = async () => {
    setLoadStatus('loading');
    setLoadError(null);
    try {
      const lights = await listTrafficLights();
      const mainLight = lights.find(l => l.id === 'main');
      if (mainLight) {
        // Узгоджуємо серверний колір з нашим індексом
        if (mainLight.currentSignal === 'red') setPhaseIndex(0);
        else if (mainLight.currentSignal === 'yellow') setPhaseIndex(1);
        else if (mainLight.currentSignal === 'green') setPhaseIndex(2);
      }
      setLoadStatus('success');
    } catch (err) {
      setLoadError(err.message);
      setLoadStatus('error');
    }
  };

  // Викликаємо завантаження при старті
  useEffect(() => {
    reloadTrafficLights();
  }, []);

  // Ефект таймера (без змін)
  useEffect(() => {
    if (!isAutomatic) return;
    const timerId = setInterval(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % CYCLE.length);
    }, 1500);
    return () => clearInterval(timerId);
  }, [isAutomatic]);

  // Функція збереження на сервер
  const saveCurrentSignal = async () => {
    setSaveStatus('saving');
    setSaveError(null);
    try {
      const updatedRecord = await updateTrafficLightState('main', currentSignal);
      // Приймаємо підтверджений сервером запис
      if (updatedRecord.currentSignal === 'red') setPhaseIndex(0);
      else if (updatedRecord.currentSignal === 'yellow') setPhaseIndex(1);
      else if (updatedRecord.currentSignal === 'green') setPhaseIndex(2);
      setSaveStatus('success');
      
      // Скидаємо статус "успіху" через 3 сек, щоб приховати повідомлення
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      setSaveError(err.message);
      setSaveStatus('error');
    }
  };

  const handleLightClick = (color) => {
    if (isAutomatic) return;
    setStats(prev => ({ ...prev, [color]: prev[color] + 1 }));
    if (color === 'red') setPhaseIndex(0);
    else if (color === 'green') setPhaseIndex(2);
    else if (color === 'yellow') setPhaseIndex(1);
  };

  const toggleOrientation = () => setOrientation(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
  const startAuto = () => setIsAutomatic(true);
  const stopAuto = () => setIsAutomatic(false);

  const value = {
    currentSignal, stats, orientation, isAutomatic,
    loadStatus, loadError, saveStatus, saveError,
    handleLightClick, toggleOrientation, startAuto, stopAuto,
    reloadTrafficLights, saveCurrentSignal
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}