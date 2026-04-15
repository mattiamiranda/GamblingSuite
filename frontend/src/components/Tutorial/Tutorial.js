import React, { useState } from 'react';
import './Tutorial.css';

function Tutorial() {
  const [activeTab, setActiveTab] = useState('blackjack');

  return (
    <div className="tutorial-content">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveTab('blackjack')}
          style={{ background: activeTab === 'blackjack' ? '#e94560' : '#0f3460' }}
        >
          Blackjack
        </button>
        <button
          onClick={() => setActiveTab('poker')}
          style={{ background: activeTab === 'poker' ? '#e94560' : '#0f3460' }}
        >
          Texas Hold'em
        </button>
      </div>

      {activeTab === 'blackjack' && <BlackjackTutorial />}
      {activeTab === 'poker' && <PokerTutorial />}
    </div>
  );
}

function BlackjackTutorial() {
  return (
    <div>
      <div className="tutorial-section">
        <h2>Obiettivo del Gioco</h2>
        <p>
          L'obiettivo del Blackjack è battere il dealer ottenendo un punteggio il più vicino possibile a 21,
          senza mai superarlo (sballare).
        </p>
      </div>

      <div className="tutorial-section">
        <h2>Valore delle Carte</h2>
        <ul>
          <li><strong> Carte numeriche (2-10):</strong> Valore nominale</li>
          <li><strong> J, Q, K:</strong> Valore 10</li>
          <li><strong> Asso:</strong> Valore 1 oppure 11 (a tua scelta)</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>Azioni Possibili</h2>
        <ul>
          <li><strong>HIT (Chiamare):</strong> Chiedere un'altra carta</li>
          <li><strong>STAND (Stare):</strong> Tenere il punteggio attuale</li>
          <li><strong>DOUBLE (Raddoppiare):</strong> Raddoppiare la puntata e ricevere esattamente una carta</li>
          <li><strong>SPLIT (Sdoppiare):</strong> Se hai due carte uguali, puoi dividerle in due mani separate</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>Strategia Base</h2>
        <h3>Coppie</h3>
        <table className="strategy-table">
          <thead>
            <tr>
              <th>Coppia</th>
              <th>Contro 2-7</th>
              <th>Contro 8+</th>
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

        <h3 style={{ marginTop: '20px' }}>Mani Hard (senza Asso)</h3>
        <table className="strategy-table">
          <thead>
            <tr>
              <th>Totale</th>
              <th>Contro 2-6</th>
              <th>Contro 7+</th>
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

        <h3 style={{ marginTop: '20px' }}>Mani Soft (con Asso)</h3>
        <table className="strategy-table">
          <thead>
            <tr>
              <th>Mano</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A,8 / A,9</td><td>STAND</td></tr>
            <tr><td>A,7</td><td>STAND (vs 2,7,8) / DOUBLE (vs 3-6)</td></tr>
            <tr><td>A,2-A,6</td><td>DOUBLE (vs 5,6) / HIT (altri)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PokerTutorial() {
  return (
    <div>
      <div className="tutorial-section">
        <h2>Cos'è il Texas Hold'em?</h2>
        <p>
          Il Texas Hold'em è la variante di poker più popolare al mondo. Ogni giocatore riceve 2 carte private
          (hole cards) e 5 carte comuni vengono distribuite sul tavolo.
        </p>
      </div>

      <div className="tutorial-section">
        <h2>Fasi del Gioco</h2>
        <ul>
          <li><strong>Pre-flop:</strong> Prima delle carte comuni, puoi scegliere di rilanciare, vedere o passare</li>
          <li><strong>Flop:</strong> 3 carte comuni sul tavolo</li>
          <li><strong>Turn:</strong> 4a carta comune</li>
          <li><strong>River:</strong> 5a e ultima carta comune</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>Ranking delle Mani</h2>
        <ul>
          <li><strong>1. Scala Reale (Royal Flush):</strong> A, K, Q, J, 10 dello stesso seme</li>
          <li><strong>2. Scala Colore (Straight Flush):</strong> 5 carte consecutive stesso seme</li>
          <li><strong>3. Poker (Four of a Kind):</strong> 4 carte dello stesso valore</li>
          <li><strong>4. Full House:</strong> Tris + Coppia</li>
          <li><strong>5. Colore (Flush):</strong> 5 carte stesso seme</li>
          <li><strong>6. Scala (Straight):</strong> 5 carte consecutive</li>
          <li><strong>7. Tris (Three of a Kind):</strong> 3 carte stesso valore</li>
          <li><strong>8. Doppia Coppia (Two Pair):</strong> 2 coppie diverse</li>
          <li><strong>9. Coppia (One Pair):</strong> 2 carte stesso valore</li>
          <li><strong>10. Carta Alta:</strong> La mano più alta vince</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>Suggerimenti Pre-flop</h2>
        <ul>
          <li><strong>RAISE:</strong> AA, KK, QQ, AK suited, KQ suited</li>
          <li><strong>CALL:</strong> Coppie medio-basse, suited connectors</li>
          <li><strong>FOLD:</strong> Carte basse non collegate, mani con figuri spaiati</li>
        </ul>
      </div>

      <div className="tutorial-section">
        <h2>Strategia Base</h2>
        <ul>
          <li>Gioca tight: concentrati su mani forti</li>
          <li>Posizione: più sei tardi, più informazioni hai</li>
          <li>Osserva gli avversari: nota le loro abitudini</li>
          <li>Bluffa con moderazione: solo quando ha senso</li>
          <li>Gestisci il bankroll: non scommettere più di quanto puoi permetterti</li>
        </ul>
      </div>
    </div>
  );
}

export default Tutorial;
