# Gambling Suite

<img width="1712" height="624" alt="GamblingSuite" src="https://github.com/user-attachments/assets/e84f3788-13db-4040-8792-05dd8a2a162f" />

Web application to learn Blackjack and Poker (Texas Hold'em).

## Tech Stack

- **Frontend**: React 18
- **Backend**: Spring Boot 3.2 (Java 17)
- **Communication**: REST API with Axios

## Project Structure

```
GamblingSuite/
├── frontend/       # React application
├── backend/        # Spring Boot application
└── README.md
```

## Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.8+

## Setup

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

## Features

### Blackjack
- Practice mode to learn basic strategy
- Instant feedback on decisions
- Accuracy statistics

### Poker (Texas Hold'em)
- Current hand analysis
- Optimal strategy recommendations

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
