export default function Light({ color, isActive, onClick }) {
  const lightStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: color,
    opacity: isActive ? 1 : 0.2,
    border: isActive ? '2px solid white' : '2px solid transparent',
    boxShadow: isActive ? `0 0 15px ${color}` : 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div 
      style={lightStyle} 
      onClick={() => onClick(color)}
      title={`Натисніть, щоб увімкнути ${color}`}
    ></div>
  );
}