import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Blackjack from './components/Blackjack/Blackjack';
import Poker from './components/Poker/Poker';
import Tutorial from './components/Tutorial/Tutorial';
import Practice from './components/Practice/Practice';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Gambling Suite</h1>
          <nav>
            <Link to="/">Blackjack</Link>
            <Link to="/poker">Texas Hold'em</Link>
            <Link to="/practice">Pratica</Link>
            <Link to="/tutorial">Tutorial</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Blackjack />} />
            <Route path="/poker" element={<Poker />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/tutorial" element={<Tutorial />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
