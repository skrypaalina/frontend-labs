import { useState, useEffect } from 'react';
import Light from './Light';
import StatsBar from './StatsBar';

// Визначаємо життєвий цикл світлофора (жовтий зустрічається двічі)
const CYCLE = ['red', 'yellow', 'green', 'yellow'];

export default function TrafficLights() {
  // Замість назви кольору зберігаємо індекс поточної фази (від 0 до 3)
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [stats, setStats] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');
  // Новий стан для автоматичного режиму
  const [isAutomatic, setIsAutomatic] = useState(false);

  // Похідний стан: колір завжди однозначно визначається індексом
  const currentSignal = CYCLE[phaseIndex];

  // Ефект, який синхронізує стан isAutomatic із браузерним таймером
  useEffect(() => {
    // Якщо автоматичний режим вимкнено, нічого не запускаємо
    if (!isAutomatic) {
      return;
    }

    // Налаштування: створюємо інтервал, який щосекунди змінює фазу
    const timerId = setInterval(() => {
      // Використовуємо функціональну форму оновлення, щоб не додавати phaseIndex у залежності
      setPhaseIndex((prevIndex) => (prevIndex + 1) % CYCLE.length);
    }, 1500); // 1.5 секунди на кожну фазу

    // Очищення: React викличе це перед наступним запуском ефекту або при зупинці
    return () => {
      clearInterval(timerId);
    };
  }, [isAutomatic]); // Ефект залежить ТІЛЬКИ від того, увімкнений режим чи ні

  const handleLightClick = (color) => {
    // Блокуємо ручне натискання, якщо працює автоматичний режим
    if (isAutomatic) return;

    // Оновлюємо статистику (лише для ручних натискань)
    setStats((prevStats) => ({
      ...prevStats,
      [color]: prevStats[color] + 1
    }));

    // Синхронізуємо ручне натискання з правильною позицією в циклі
    if (color === 'red') setPhaseIndex(0);
    else if (color === 'green') setPhaseIndex(2);
    else if (color === 'yellow') setPhaseIndex(1); // За замовчуванням переходимо на перший жовтий
  };

  const handleToggleOrientation = () => {
    setOrientation((prev) => (prev === 'vertical' ? 'horizontal' : 'vertical'));
  };

  const trafficLightStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: '15px',
    backgroundColor: '#2c3e50',
    padding: '20px',
    borderRadius: '15px',
    width: 'fit-content',
    margin: '0 auto'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StatsBar 
        stats={stats} 
        currentSignal={currentSignal}
        orientation={orientation}
        onToggleOrientation={handleToggleOrientation}
        isAutomatic={isAutomatic}
        onStartAuto={() => setIsAutomatic(true)}
        onStopAuto={() => setIsAutomatic(false)}
      />
      
      <div style={trafficLightStyle}>
        <Light color="red" isActive={currentSignal === 'red'} onClick={handleLightClick} />
        <Light color="yellow" isActive={currentSignal === 'yellow'} onClick={handleLightClick} />
        <Light color="green" isActive={currentSignal === 'green'} onClick={handleLightClick} />
      </div>
    </div>
  );
}
