import { useState } from 'react';
import Light from './Light';
import StatsBar from './StatsBar';

export default function TrafficLights() {
  const [currentSignal, setCurrentSignal] = useState('red');
  const [stats, setStats] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');

  const handleLightClick = (color) => {
    setCurrentSignal(color);
    setStats((prevStats) => ({
      ...prevStats,
      [color]: prevStats[color] + 1
    }));
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
      />
      
      <div style={trafficLightStyle}>
        <Light color="red" isActive={currentSignal === 'red'} onClick={handleLightClick} />
        <Light color="yellow" isActive={currentSignal === 'yellow'} onClick={handleLightClick} />
        <Light color="green" isActive={currentSignal === 'green'} onClick={handleLightClick} />
      </div>
    </div>
  );
}