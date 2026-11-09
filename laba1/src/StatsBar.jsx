export default function StatsBar({ stats, currentSignal, orientation, onToggleOrientation }) {
  const totalClicks = stats.red + stats.yellow + stats.green;
  const orientationText = orientation === 'vertical' ? 'Вертикальна' : 'Горизонтальна';

  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px', 
      marginBottom: '20px',
      minWidth: '250px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: 'black' }}>Статистика світлофора</h3>
      <p style={{ color: 'black' }}>Поточний сигнал: <strong style={{ color: currentSignal }}>{currentSignal}</strong></p>
      
      <ul style={{ paddingLeft: '20px', color: 'black' }}>
        <li>Червоний (red): {stats.red}</li>
        <li>Жовтий (yellow): {stats.yellow}</li>
        <li>Зелений (green): {stats.green}</li>
      </ul>
      
      <p style={{ color: 'black' }}><strong>Загальна кількість взаємодій: {totalClicks}</strong></p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <span style={{ color: 'black' }}>Орієнтація: <b>{orientationText}</b></span>
        <button onClick={onToggleOrientation} style={{ cursor: 'pointer', padding: '5px 10px' }}>
          Перемикнути
        </button>
      </div>
    </div>
  );
}