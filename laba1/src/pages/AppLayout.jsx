// src/pages/AppLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      minHeight: '100vh', 
      backgroundColor: '#1a1a1a', 
      color: 'white',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ padding: '20px', width: '100%', textAlign: 'center', backgroundColor: '#333' }}>
        <nav style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#4da6ff' : 'white', textDecoration: 'none', fontWeight: 'bold' })}>Головна</NavLink>
          <NavLink to="/traffic-light" style={({ isActive }) => ({ color: isActive ? '#4da6ff' : 'white', textDecoration: 'none', fontWeight: 'bold' })}>Світлофор</NavLink>
          <NavLink to="/stats" style={({ isActive }) => ({ color: isActive ? '#4da6ff' : 'white', textDecoration: 'none', fontWeight: 'bold' })}>Статистика</NavLink>
        </nav>
      </header>

      {/* Сюди підставлятимуться сторінки залежно від URL */}
      <main style={{ padding: '40px 20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </main>
    </div>
  );
}