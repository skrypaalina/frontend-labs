// src/pages/StatsPage.jsx
import { useContext } from 'react';
import { TrafficLightsContext } from '../TrafficLightsContext';
import StatsBar from '../StatsBar';

export default function StatsPage() {
  // Витягуємо весь стан і передаємо у наш старий компонент StatsBar
  const contextData = useContext(TrafficLightsContext);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Керування та Статистика</h2>
      <StatsBar 
        stats={contextData.stats}
        currentSignal={contextData.currentSignal}
        orientation={contextData.orientation}
        onToggleOrientation={contextData.toggleOrientation}
        isAutomatic={contextData.isAutomatic}
        onStartAuto={contextData.startAuto}
        onStopAuto={contextData.stopAuto}
      />
    </div>
  );
}