// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import TrafficLightPage from './pages/TrafficLightPage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="traffic-light" element={<TrafficLightPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;