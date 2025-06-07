# Tech Quiz App 🧠

A fun and interactive quiz app built with the MERN stack that lets you test your knowledge with random coding-related questions. Take the quiz, see your score, and try again!

---

## 🚀 Live Demo

_This app is designed to run locally. See instructions below to get started._

---

## 📸 Features

- Start a quiz with one click  
- Answer 10 randomized coding questions  
- Get your final score at the end  
- Restart the quiz at any time

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite  
- **Backend**: Node.js, Express, MongoDB, Mongoose  
- **Testing**: Cypress (Component & E2E)

---

## 📦 Installation

Follow these steps to run the app locally on your machine.

### 1. Clone the Repository

```bash
git https://github.com/johnwgomez/19-tech-quiz-test-suite
cd 19-tech-quiz-test-suite
```

### 2. Install Dependencies

Install all dependencies in the project root, client, and server folders.

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Configure Environment Variables

In the `/server` directory, rename `.env.example` to `.env` and add the following:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/quizdb
PORT=3001
```

### 4. Seed the Database

```bash
cd server
npm run build
node --experimental-json-modules dist/seeds/seed.js
```

### 5. Start the Server

```bash
npm start
```

### 6. Run the Frontend

In a new terminal tab:

```bash
cd client
npm run dev
```

Now open your browser and visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Running Cypress Tests (Optional)

If you'd like to run tests:

```bash
npm run test
```

This will run both **component** and **end-to-end** tests with Cypress (if properly configured and connected).

---

## 💡 How to Use

1. Open the app in your browser  
2. Click **Start Quiz**  
3. Choose your answers for each question  
4. View your score at the end  
5. Click **Restart** to try again!

---

## 🤝 Acknowledgments

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).