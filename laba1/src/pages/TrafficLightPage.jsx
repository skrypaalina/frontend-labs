// src/pages/TrafficLightPage.jsx
import { useContext } from 'react';
import { TrafficLightsContext } from '../TrafficLightsContext';
import Light from '../Light';

export default function TrafficLightPage() {
  // Витягуємо тільки те, що потрібно для самого світлофора
  const { currentSignal, orientation, handleLightClick } = useContext(TrafficLightsContext);

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
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Інтерактивний світлофор</h2>
      <div style={trafficLightStyle}>
        <Light color="red" isActive={currentSignal === 'red'} onClick={handleLightClick} />
        <Light color="yellow" isActive={currentSignal === 'yellow'} onClick={handleLightClick} />
        <Light color="green" isActive={currentSignal === 'green'} onClick={handleLightClick} />
      </div>
    </div>
  );
}
