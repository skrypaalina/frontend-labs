import TrafficLights from './TrafficLights';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Інтерактивний світлофор</h1>
      <TrafficLights />
    </div>
  );
}

export default App;