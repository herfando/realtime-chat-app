# 💬 Realtime Chat App

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-DB-blue?logo=supabase)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 About

**Realtime Chat App** is a modern chat application built with **Next.js**, **TailwindCSS**, and **Supabase**.  
Send and receive messages instantly across users with **smooth animations**, **responsive design**, and **modular components**.  
This project demonstrates **fullstack frontend skills**, **realtime database integration**, and **production-ready structure**.

<p align="center">
  <img src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" width="500" alt="Realtime Chat Demo"/>
</p>

---

## 🚀 Features

- 💬 **Realtime Messaging** – messages appear instantly without page reload  
- 📱 **Responsive UI** – mobile, tablet, and desktop friendly  
- 🔐 **Authentication Ready** – email & OAuth login support  
- 🎨 **Modern UI** – TailwindCSS animations, chat bubbles, scroll effects  
- ♻️ **Modular Components** – reusable `ChatBox` & `Message` components  
- ⚡ **Production-ready Structure** – Next.js + TypeScript + TailwindCSS  

---

## 🛠️ Tech Stack

| Frontend                 | Backend                          | Deployment |
|---------------------------|---------------------------------|------------|
| Next.js + TypeScript      | Supabase Realtime DB + Auth      | Vercel     |
| TailwindCSS               | PostgreSQL                       |            |
| Framer Motion (optional)  | Realtime messaging subscription  |            |

---

## 📂 Folder Structure


realtime-chat-app/
┣ pages/
┃ ┗ index.tsx ← Main Chat Page
┣ components/
┃ ┣ ChatBox.tsx ← Chat container
┃ ┗ Message.tsx ← Chat bubble
┣ lib/
┃ ┗ supabase.ts ← Supabase client
┣ styles/
┃ ┗ globals.css
┣ .env.local ← Environment variables (Supabase URL & KEY)
┗ package.json


---

## ⚡ Getting Started

1️⃣ **Clone repository**
```bash
git clone https://github.com/username/realtime-chat-app.git
cd realtime-chat-app

npm install

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

npm run dev

Open http://localhost:3000

🎯 Roadmap / Next Steps

🌐 Authentication: email & OAuth login

🖼 User avatars & online/offline indicators

🔄 Multiple chat rooms / group chat

🌙 Dark mode toggle

🚀 Firebase version for production-ready deployment

✨ Smooth animations & emoji reactions

💡 Notes

Built as a portfolio project

Core concepts are transferable to Firebase or other production-ready realtime services

Environment variables .env.local should never be pushed to GitHub

Follows Next.js + TypeScript best practices for maintainable code

🎉 Demo
<p align="center"> <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" width="500" alt="Chat Animation"/> </p>

Live demo will be deployed on Vercel soon

🔗 Live Preview

Deployment link: Coming Soon…
