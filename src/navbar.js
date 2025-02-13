import React from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div className="navbar">
      <h1 style={{ margin: 0 }}>Todo App</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: 'var(--accent-color)'
          }}
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;