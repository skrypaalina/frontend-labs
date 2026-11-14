// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Схоже, ви перейшли за неіснуючим посиланням.</p>
      <Link to="/" style={{ color: '#4da6ff' }}>Повернутися на Головну</Link>
    </div>
  );
}
