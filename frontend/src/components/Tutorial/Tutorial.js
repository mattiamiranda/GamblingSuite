import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './Tutorial.css';

function Tutorial() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('blackjack');

  const bt = t('blackjackTutorial');
  const pt = t('pokerTutorial');

  return (
    <div className="tutorial-content">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveTab('blackjack')}
          style={{ background: activeTab === 'blackjack' ? '#e94560' : '#0f3460' }}
        >
          {t('blackjack')}
        </button>
        <button
          onClick={() => setActiveTab('poker')}
          style={{ background: activeTab === 'poker' ? '#e94560' : '#0f3460' }}
        >
          {t('poker')}
        </button>
      </div>

      {activeTab === 'blackjack' && <BlackjackTutorial bt={bt} />}
      {activeTab === 'poker' && <PokerTutorial pt={pt} />}
    </div>
  );
}

function BlackjackTutorial({ bt }) {
  const lang = bt.objective.toLowerCase().includes('obiettivo') ? 'it' : 'en';
  
  return (
    <div>
      <div className="tutorial-section">
        <h2>{bt.objective}</h2>
        <p>{bt.objectiveText}</p>
      </div>

      <div className="tutorial-section">
        <h2>{bt.cardValues}</h2>
        <ul>
          <li><strong>{lang === 'it' ? 'Carte numeriche (2-10):' : 'Numbered cards (2-10):'}</strong> {lang === 'it' ? 'Valore nominale' : 'Face value'}</li>
          <li><strong>J, Q, K:</strong> 10</li>
          <li><strong>{lang === 'it' ? 'Asso:' : 'Ace:'}</strong> {lang === 'it' ? '1 oppure 11' : '1 or 11'}</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>{bt.actions}</h2>
        <ul>
          <li><strong>HIT</strong>: {bt.hit}</li>
          <li><strong>STAND</strong>: {bt.stand}</li>
          <li><strong>DOUBLE</strong>: {bt.double}</li>
          <li><strong>SPLIT</strong>: {bt.split}</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>{bt.basicStrategy}</h2>
        <h3>{bt.pairs}</h3>
        <table className="strategy-table">
          <thead>
            <tr>
              <th>{lang === 'it' ? 'Coppia' : 'Pair'}</th>
              <th>{bt.vs} 2-7</th>
              <th>{bt.vs} 8+</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A,A / 8,8</td><td>SPLIT</td><td>SPLIT</td></tr>
            <tr><td>10,10</td><td>STAND</td><td>STAND</td></tr>
            <tr><td>9,9</td><td>SPLIT</td><td>STAND</td></tr>
            <tr><td>7,7</td><td>SPLIT</td><td>HIT</td></tr>
            <tr><td>6,6</td><td>SPLIT</td><td>HIT</td></tr>
            <tr><td>2,2 / 3,3</td><td>SPLIT</td><td>HIT</td></tr>
          </tbody>
        </table>

        <h3 style={{ marginTop: '20px' }}>{bt.hardHands}</h3>
        <table className="strategy-table">
          <thead>
            <tr>
              <th>{bt.total}</th>
              <th>{bt.vs} 2-6</th>
              <th>{bt.vs} 7+</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>17+</td><td>STAND</td><td>STAND</td></tr>
            <tr><td>13-16</td><td>STAND</td><td>HIT</td></tr>
            <tr><td>12</td><td>STAND (vs 4-6)</td><td>HIT</td></tr>
            <tr><td>11</td><td>DOUBLE</td><td>DOUBLE</td></tr>
            <tr><td>10</td><td>DOUBLE (vs 2-9)</td><td>HIT</td></tr>
            <tr><td>9</td><td>DOUBLE (vs 3-6)</td><td>HIT</td></tr>
            <tr><td>5-8</td><td>HIT</td><td>HIT</td></tr>
          </tbody>
        </table>

        <h3 style={{ marginTop: '20px' }}>{bt.softHands}</h3>
        <table className="strategy-table">
          <thead>
            <tr>
              <th>{bt.hand}</th>
              <th>{bt.action}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A,8 / A,9</td><td>STAND</td></tr>
            <tr><td>A,7</td><td>STAND (vs 2,7,8) / DOUBLE (vs 3-6)</td></tr>
            <tr><td>A,2-A,6</td><td>DOUBLE (vs 5,6) / HIT (others)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PokerTutorial({ pt }) {
  const lang = pt.whatIs.toLowerCase().includes('cos') ? 'it' : 'en';

  return (
    <div>
      <div className="tutorial-section">
        <h2>{pt.whatIs}</h2>
        <p>{pt.whatIsText}</p>
      </div>

      <div className="tutorial-section">
        <h2>{pt.phases}</h2>
        <ul>
          <li><strong>Pre-flop</strong>: {pt.preflop}</li>
          <li><strong>Flop</strong>: {pt.flop}</li>
          <li><strong>Turn</strong>: {pt.turn}</li>
          <li><strong>River</strong>: {pt.river}</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>{pt.ranking}</h2>
        <ul>
          <li><strong>1. {pt.royalFlush}</strong></li>
          <li><strong>2. {pt.straightFlush}</strong></li>
          <li><strong>3. {pt.fourOfAKind}</strong></li>
          <li><strong>4. {pt.fullHouse}</strong></li>
          <li><strong>5. {pt.flush}</strong></li>
          <li><strong>6. {pt.straight}</strong></li>
          <li><strong>7. {pt.threeOfAKind}</strong></li>
          <li><strong>8. {pt.twoPair}</strong></li>
          <li><strong>9. {pt.onePair}</strong></li>
          <li><strong>10. {pt.highCard}</strong></li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>{pt.preflopTips}</h2>
        <ul>
          <li><strong>{pt.raise}</strong>: AA, KK, QQ, AK suited, KQ suited</li>
          <li><strong>{pt.call}</strong>: {lang === 'it' ? 'Coppie medio-basse, suited connectors' : 'Medium-low pairs, suited connectors'}</li>
          <li><strong>{pt.fold}</strong>: {lang === 'it' ? 'Carte basse non collegate, mani con figuri spaiati' : 'Unconnected low cards, offsuit face cards'}</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>{pt.basicStrategy}</h2>
        <ul>
          <li>{pt.playTight}</li>
          <li>{pt.position}</li>
          <li>{pt.observe}</li>
          <li>{pt.bluff}</li>
          <li>{pt.bankroll}</li>
        </ul>
      </div>
    </div>
  );
}

export default Tutorial;
