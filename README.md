# 🎓 Study Partner Finder — Frontend

A modern web app that helps students find compatible **study partners**, **share posts**, **track habits**, and **join live study sessions** — built with **React** and **Tailwind CSS**.

This repository contains the **frontend** of the Study Partner Finder project, connecting to a **PHP backend** and a **Go service** for smart user matching.

---

## 🚀 Features

* 🧩 **Dashboard:** Central hub showing posts, habits, and community activities
* 👤 **Profile:** Manage user info, habits, and study connections
* 🤝 **Find Partner:** Match with study partners based on subjects and schedules
* 💬 **Posts & Habits:** Create posts, share progress, and track daily study habits
* 🎥 **Meeting Plugin Integration:** Join real-time study sessions seamlessly
* 🔁 **Infinite Scroll:** Smooth post loading for a modern social-feed experience
* 📱 **Responsive UI:** Optimized for desktop and mobile users

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Data Fetching:** Custom hook (`useInfinitePosts`)
* **Backend:** PHP (API + database)
* **Matching Engine:** Go (Golang)
* **Meeting Plugin:** Integrated 3rd-party service

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── FeedCard.tsx
│   ├── HabitCard.tsx
│   ├── CreatePostCard.tsx
│   ├── ProfileCard.tsx
│   └── MatchResultModal.tsx
├── pages/
│   ├── Index.tsx          # Dashboard Page
│   ├── Profile.tsx        # User Profile Page
│   └── FindPartner.tsx    # Partner Finder Page
└── hooks/
    └── useInfinitePosts.ts
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/ayia-hosni/study-sync-frontend.git

# Navigate into the project
cd study-partner-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

App will run on **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Environment Variables

Create a `.env` file and add:

```
VITE_API_URL=https://your-backend-api.com
VITE_MEET_PLUGIN_KEY=your_plugin_key
```

---

## 📖 Component Documentation

Detailed docs available for each page:

* [Dashboard (Index.tsx)](#)
* [Profile Page (Profile.tsx)](#)
* [Study Partner Finder (FindPartner.tsx)](#)

---

## 🤝 Contributing

Contributions and feedback are welcome!
Open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.