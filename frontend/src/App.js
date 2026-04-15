import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Blackjack from './components/Blackjack/Blackjack';
import Poker from './components/Poker/Poker';
import Tutorial from './components/Tutorial/Tutorial';
import Practice from './components/Practice/Practice';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import './styles/App.css';

function AppContent() {
  const { t } = useLanguage();

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>{t('appTitle')}</h1>
          <nav>
            <Link to="/">{t('blackjack')}</Link>
            <Link to="/poker">{t('poker')}</Link>
            <Link to="/practice">{t('practice')}</Link>
            <Link to="/tutorial">{t('tutorial')}</Link>
          </nav>
          <LanguageSelector />
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

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
