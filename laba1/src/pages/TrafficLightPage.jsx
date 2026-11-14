import { useContext } from 'react';
import { TrafficLightsContext } from '../TrafficLightsContext';
import Light from '../Light';

export default function TrafficLightPage() {
  const { 
    currentSignal, 
    orientation, 
    handleLightClick,
    loadStatus,
    loadError,
    reloadTrafficLights,
    saveCurrentSignal,
    saveStatus,
    saveError
  } = useContext(TrafficLightsContext);

  const trafficLightStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: '15px',
    backgroundColor: '#2c3e50',
    padding: '20px',
    borderRadius: '15px',
    width: 'fit-content',
    margin: '0 auto',
    opacity: loadStatus === 'loading' ? 0.5 : 1 // Трохи прозоре, якщо вантажиться
  };

  // Якщо сталася помилка при завантаженні (CP5)
  if (loadStatus === 'error') {
    return (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h2 style={{ color: '#ff4d4d' }}>Помилка завантаження</h2>
        <p>{loadError}</p>
        <button onClick={reloadTrafficLights} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Повторити
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Інтерактивний світлофор</h2>
      
      {/* Показуємо статус завантаження */}
      {loadStatus === 'loading' && <p style={{ color: 'yellow' }}>Завантаження даних світлофора...</p>}

      <div style={trafficLightStyle}>
        <Light color="red" isActive={currentSignal === 'red'} onClick={handleLightClick} />
        <Light color="yellow" isActive={currentSignal === 'yellow'} onClick={handleLightClick} />
        <Light color="green" isActive={currentSignal === 'green'} onClick={handleLightClick} />
      </div>

      {/* Панель серверного збереження */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#333', borderRadius: '10px', display: 'inline-block' }}>
        <button 
          onClick={saveCurrentSignal} 
          disabled={saveStatus === 'saving' || loadStatus === 'loading'}
          style={{ 
            padding: '10px 20px', 
            cursor: (saveStatus === 'saving' || loadStatus === 'loading') ? 'not-allowed' : 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}>
          {saveStatus === 'saving' ? 'Збереження...' : 'Зберегти поточний сигнал'}
        </button>
        
        {saveStatus === 'success' && <p style={{ color: 'lightgreen', margin: '10px 0 0 0' }}>✅ Успішно збережено на сервер!</p>}
        {saveStatus === 'error' && <p style={{ color: '#ff4d4d', margin: '10px 0 0 0' }}>❌ Помилка: {saveError}</p>}
      </div>
    </div>
  );
}