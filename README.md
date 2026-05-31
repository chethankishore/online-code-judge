# ⚔️ Online Code Judge — *The Competitive Programming Arena*

> *"In this world, it's either you code or you get coded."* — Inspired by **Sword Art Online**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🌸 What Is This?

Welcome to **Online Code Judge** — a full-stack competitive programming platform where coders battle it out like it's the **Chunin Exams** from *Naruto*. Submit your code, climb the leaderboard, and prove you're the strongest shinobi of syntax.

Whether you're a **Genin** just starting out or a **Kage-level** coder who dreams in algorithms — this platform is your arena.

---

## ✨ Features

| Feature | Anime Equivalent |
|---|---|
| 🧩 **Problem Sets** | D-Rank to S-Rank missions (*Hunter x Hunter*) |
| ⚡ **Code Submission & Judge** | Quirk activation (*My Hero Academia*) |
| 🏆 **Leaderboard** | Power Level Rankings (*Dragon Ball Z*) |
| 🔐 **Google OAuth Login** | Gate of Truth unlocked (*Fullmetal Alchemist*) |
| 📊 **User Dashboard** | Stats screen like an Isekai protagonist |
| 🌐 **Real-time Feedback** | Sharingan-level precision (*Naruto*) |

---

## 🗺️ Project Structure

```
online-code-judge/
│
├── 📁 backend/                  # The Hidden Leaf Village (server)
│   ├── config/
│   │   └── passport.js          # Authentication Jutsu
│   ├── routes/
│   │   ├── authRoutes.js        # Login/Signup Scrolls
│   │   ├── problemRoutes.js     # Mission Board
│   │   ├── submissionRoutes.js  # Jutsu Submission
│   │   ├── dashboardRoutes.js   # Ninja Profile
│   │   └── leaderboardRoutes.js # Bingo Book Rankings
│   ├── app.js                   # Village Gate (main entry)
│   └── server.js                # The Hokage's Office
│
└── 📁 frontend/                 # The World Outside (React)
    ├── src/
    │   ├── components/          # Summon Scrolls (UI components)
    │   ├── pages/               # Different Realms
    │   └── App.jsx              # The Main Timeline
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

> *"Before you run, you must walk."* — Rock Lee's sensei

- Node.js `v18+`
- MongoDB Atlas account
- Google OAuth credentials
- Git

---

### ⚙️ Backend Setup

```bash
# Clone the repo (Enter the Gate)
git clone https://github.com/yourusername/online-code-judge.git
cd online-code-judge/backend

# Install dependencies (Unlock your Chakra)
npm install

# Create .env file
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_super_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
```

```bash
# Start the server (Activate Sage Mode)
npm run dev
```

---

### 🎨 Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🔑 Authentication

Login is powered by **Google OAuth 2.0** via Passport.js.

> *"The key to the Gate of Truth is your Google account."* — Edward Elric, probably

```
User clicks Login
      ↓
Google OAuth → /api/auth/google
      ↓
Passport.js validates
      ↓
Session cookie created 🍪
      ↓
Redirected to Dashboard ✅
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/google` | Initiate Google OAuth |
| GET | `/api/auth/google/callback` | OAuth Callback |
| GET | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

### Problems
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/problems` | Get all problems |
| GET | `/api/problems/:id` | Get problem by ID |

### Submissions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submissions` | Submit code |
| GET | `/api/submissions/my` | Get my submissions |

### Leaderboard & Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaderboard` | Get global rankings |
| GET | `/api/dashboard` | Get user stats |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

---

## 🌍 Deployment

### Backend → [Render](https://render.com)

> *"Even a free-tier ninja can be strong with the right jutsu."*

- Deployed on Render Free Tier
- **UptimeRobot** pings `/health` every 5 minutes to prevent cold starts
- Auto-deploys on push to `main`

### Frontend → [Vercel](https://vercel.com)

- Live at: `https://online-code-judge-pi.vercel.app`
- Auto-deploys on push to `main`

---

## 🧪 Tech Stack

### Backend
- **Node.js** + **Express.js** — The backbone (like All Might's skeleton)
- **MongoDB** + **Mongoose** — Our Akashic Records
- **Passport.js** — The Authentication Sage
- **Express Session** — Memory that persists (unlike goldfish)
- **CORS** — Peace treaty between frontend & backend

### Frontend
- **React** + **Vite** — Fast as Minato Namikaze
- **Tailwind CSS** — Style jutsu
- **Axios** — The messenger hawk

---

## 🏅 Leaderboard System

> *"A true warrior is always ranked."* — Vegeta

Users are ranked based on:
- ✅ Problems solved
- ⚡ Submission speed
- 💯 Accuracy rate

Climb from **Bronze → Silver → Gold → Platinum → Diamond** — just like ranked in *No Game No Life*.

---

## 🛡️ Security

- Cookies are `httpOnly` and `secure` in production
- `sameSite: 'none'` for cross-origin auth (frontend on Vercel, backend on Render)
- `trust proxy` enabled for correct IP resolution
- Environment variables for all secrets (never commit your `.env`!)

> *"A shinobi who reveals their secrets is already dead."* — Kakashi Hatake

---

## 🐛 Known Issues / Roadmap

- [ ] 🔄 Real-time code execution with sandboxing
- [ ] 💬 Discussion threads per problem
- [ ] 🎯 Daily challenge system (like Daily Quests in SAO)
- [ ] 🏆 Tournament mode (Chunin Exam arc)
- [ ] 📱 Mobile responsive improvements
- [ ] 🌙 Dark/Light theme toggle

---

## 🤝 Contributing

> *"The Will of Fire burns in all who contribute."*

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/rasengan-mode`
3. Commit your changes: `git commit -m "Add Rasengan attack pattern"`
4. Push to the branch: `git push origin feature/rasengan-mode`
5. Open a Pull Request

---

## 📜 License

MIT License — *"Free as the wind, like Naruto running."*

---

## 👨‍💻 Author

Built with 🔥 and way too much anime by **[Your Name]**

> *"I never go back on my word. That's my nindo — my ninja way."* — Naruto Uzumaki

---

<div align="center">

**⭐ Star this repo if you believe in the Will of Fire ⭐**

</div>