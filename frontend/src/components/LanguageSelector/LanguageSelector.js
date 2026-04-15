import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './LanguageSelector.css';

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-selector">
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">EN</option>
        <option value="it">IT</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
