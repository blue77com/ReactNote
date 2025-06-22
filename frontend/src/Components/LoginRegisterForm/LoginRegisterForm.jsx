import React, { useState } from 'react';
import './LoginRegisterForm.css';

export default function LoginRegisterForm({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [regLogin, setRegLogin] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin?.({ login, password, remember });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister?.({ login: regLogin, email: regEmail, password: regPassword });
  };

  return (
    <div className='auth-wrapper'>
      <div className="auth-container">
        <div className="auth-tabs">
          <span
            className={mode === 'login' ? 'active-tab' : 'inactive-tab'}
            onClick={() => setMode('login')}
          >
            Вход
          </span>
          <span
            className={mode === 'register' ? 'active-tab' : 'inactive-tab'}
            onClick={() => setMode('register')}
          >
            Регистрация
          </span>
        </div>

        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <label>Логин:</label>
            <input
              type="text"
              placeholder="Ваш логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <label>
              Пароль: <a href="#" className="forgot-link">Забыли пароль?</a>
            </label>
            <input
              type="password"
              placeholder="Ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="remember-row">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="remember">Запомнить меня</label>
            </div>
            <button type="submit" className="login-button">
              Войти на сайт
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <label>Логин:</label>
            <input
              type="text"
              placeholder="Придумайте логин"
              value={regLogin}
              onChange={(e) => setRegLogin(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Ваш email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <label>Пароль:</label>
            <input
              type="password"
              placeholder="Придумайте пароль"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Зарегистрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
