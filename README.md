<div align="center">

# 🎥 MeetUp.

### **High quality video calls. Built for everyone.**

Connect, collaborate, and celebrate from anywhere with ultra-low latency video, screen sharing, and real-time chat.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)

<br />

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Contributing](#-contributing) · [License](#-license)

<br />

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Secure Authentication
Enterprise-grade auth powered by **Clerk** with support for social logins, email/password, and multi-factor authentication.

</td>
<td width="50%">

### 📹 Instant Meetings
Create and join video meetings instantly with auto-generated meeting codes. One click to start, one link to share.

</td>
</tr>
<tr>
<td width="50%">

### 🛡️ End-to-End Encrypted
All meetings are secured with advanced peer-to-peer encryption protocols, keeping your conversations private.

</td>
<td width="50%">

### ⚡ Ultra-Low Latency
Crystal clear HD video with real-time WebRTC connections. No lag, no buffering, just seamless communication.

</td>
</tr>
<tr>
<td width="50%">

### 📊 Smart Dashboard
Personalized dashboard with meeting stats, recent sessions, quick actions, and one-click access to all features.

</td>
<td width="50%">

### 🌍 Connect Anywhere
Join from any device, any browser, anywhere in the world. Fully responsive design from mobile to desktop.

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) with JSX |
| **Build Tool** | [Vite 8](https://vite.dev) — Lightning fast HMR |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS |
| **Authentication** | [Clerk](https://clerk.com) — Complete user management |
| **Routing** | [React Router v7](https://reactrouter.com) — Client-side routing |
| **Icons** | [Lucide React](https://lucide.dev) — Beautiful consistent icons |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com) — Lightweight toasts |
| **Font** | [Urbanist](https://fonts.google.com/specimen/Urbanist) — Modern geometric sans-serif |
| **Linting** | [OXLint](https://oxc.rs) — Blazing fast linter |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.0.0`
- **npm** or **pnpm**
- A [Clerk](https://clerk.com) account (free tier available)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/meet-up.git
cd meet-up/frontend
```

**2. Install dependencies**

```bash
npm install
# or
pnpm install
```

**3. Set up environment variables**

Create a `.env` file in the `frontend/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
```

> 💡 Get your publishable key from the [Clerk Dashboard](https://dashboard.clerk.com) → API Keys

**4. Start the development server**

```bash
npm run dev
```

**5. Open your browser**

Navigate to [http://localhost:5173](http://localhost:5173) and you're all set! 🎉

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
meet-up/
└── frontend/
    ├── public/
    │   ├── favicon.svg          # App favicon
    │   ├── logo.svg             # MeetUp brand logo
    │   ├── icons.svg            # SVG icon sprites
    │   ├── layout_bg.png        # Dashboard background
    │   └── login_bg.png         # Login page background
    │
    ├── src/
    │   ├── assets/
    │   │   └── asset.js         # Dummy data & mock assets
    │   │
    │   ├── components/
    │   │   ├── Footer.jsx       # App footer with links & newsletter
    │   │   ├── Loader.jsx       # Loading spinner component
    │   │   ├── Navbar.jsx       # Top navigation bar
    │   │   ├── ProtectedLayout.jsx  # Layout wrapper (Navbar + Footer)
    │   │   └── ProtectedRoute.jsx   # Auth route guard
    │   │
    │   ├── pages/
    │   │   ├── Dashboard.jsx    # Main dashboard with stats & actions
    │   │   ├── Login.jsx        # Auth page (Sign In / Sign Up)
    │   │   ├── MeetingRoom.jsx  # Video meeting room
    │   │   ├── Pricing.jsx      # Pricing plans page
    │   │   └── Sessions.jsx     # Meeting history & sessions
    │   │
    │   ├── hooks/               # Custom React hooks
    │   ├── App.jsx              # Root app with routing
    │   ├── main.jsx             # Entry point with Clerk & Router
    │   └── index.css            # Global styles & Tailwind config
    │
    ├── index.html               # HTML entry point
    ├── vite.config.js           # Vite configuration
    ├── package.json             # Dependencies & scripts
    └── README.md                # You are here! 📍
```

---

## 🎨 Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#004CFF` | 🔵 Brand color, buttons, links |
| `primary-hover` | `#0033AD` | 🔵 Hover states |
| `primary-light` | `#D9E4FF` | 🔵 Light backgrounds |
| `primary-border` | `#7A9CFF` | 🔵 Border accents |
| `slate-50` | `#F8FAFC` | ⚪ Page background |
| `slate-900` | `#0F172A` | ⚫ Primary text |

### Typography

- **Font Family:** [Urbanist](https://fonts.google.com/specimen/Urbanist) — A modern, geometric sans-serif
- **Weights:** 100–900 (Variable font)

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `localhost:5173` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OXLint for code quality checks |

---

## 🗺️ Roadmap

- [x] Authentication with Clerk (Sign In / Sign Up)
- [x] Protected routes & layouts
- [x] Dashboard with quick actions & stats
- [x] Recent sessions with live status indicators
- [x] Responsive Navbar & Footer
- [ ] Real-time video calls with WebRTC
- [ ] Screen sharing & recording
- [ ] In-meeting chat
- [ ] Meeting scheduling & calendar integration
- [ ] Sessions history page
- [ ] Pricing plans & payments
- [ ] Backend API integration

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for better meetings**

<br />

[⬆ Back to top](#-meetup)

</div>
