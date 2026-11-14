export default function StatsBar({ 
  stats, 
  currentSignal, 
  orientation, 
  onToggleOrientation,
  isAutomatic,
  onStartAuto,
  onStopAuto
}) {
  const totalClicks = stats.red + stats.yellow + stats.green;
  const orientationText = orientation === 'vertical' ? 'Вертикальна' : 'Горизонтальна';

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px', 
      marginBottom: '25px',
      minWidth: '300px' // Трохи розширив для нових кнопок
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: 'black', textAlign: 'center' }}>Керування світлофором</h3>
      
      {/* Кнопки автоматичного режиму */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={onStartAuto} 
          disabled={isAutomatic}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: isAutomatic ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isAutomatic ? 'not-allowed' : 'pointer'
          }}>
          ▶ Запустити
        </button>
        <button 
          onClick={onStopAuto} 
          disabled={!isAutomatic}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: !isAutomatic ? '#ccc' : '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: !isAutomatic ? 'not-allowed' : 'pointer'
          }}>
          ⏹ Зупинити
        </button>
      </div>

      <p style={{ color: 'black', textAlign: 'center', marginBottom: '5px' }}>
        Режим: <strong>{isAutomatic ? 'Автоматичний ⏱️' : 'Ручний 👆'}</strong>
      </p>

      <p style={{ color: 'black', textAlign: 'center' }}>
        Поточний сигнал: <strong style={{ color: currentSignal }}>{currentSignal}</strong>
      </p>
      
      <ul style={{ paddingLeft: '40px', color: 'black', display: 'table', margin: '10px auto' }}>
        <li>Червоний (red): {stats.red}</li>
        <li>Жовтий (yellow): {stats.yellow}</li>
        <li>Зелений (green): {stats.green}</li>
      </ul>
      
      <p style={{ color: 'black', textAlign: 'center', marginTop: '15px' }}>
        <strong>Ручних взаємодій: {totalClicks}</strong>
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
        <span style={{ color: 'black' }}>Орієнтація: <b>{orientationText}</b></span>
        <button onClick={onToggleOrientation} style={{ 
          cursor: 'pointer', 
          padding: '6px 12px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>
          Перемикнути
        </button>
      </div>
    </div>
  );
}
