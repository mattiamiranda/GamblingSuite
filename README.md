# Gambling Suite

Applicazione web per imparare a giocare a Blackjack e Poker (Texas Hold'em).

## Tech Stack

- **Frontend**: React 18
- **Backend**: Spring Boot 3.2 (Java 17)
- **Comunicazione**: REST API con Axios

## Struttura Progetto

```
GamblingSuite/
├── frontend/       # Applicazione React
├── backend/       # Applicazione Spring Boot
└── README.md
```

## Prerequisiti

- Node.js 18+
- Java 17+
- Maven 3.8+

## Setup

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Il backend sarà disponibile su `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm start
```

Il frontend sarà disponibile su `http://localhost:3000`

## Funzionalità

### Blackjack
- Modalità pratica per imparare la strategia base
- Feedback immediato sulle decisioni
- Statistiche di accuratezza

### Poker (Texas Hold'em)
- Analisi della mano corrente
- Suggerimenti basati sulla strategia ottimale

## Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
./mvnw package
java -jar target/gambling-suite-backend-1.0.0.jar
```
