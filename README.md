# Sai Durga Events

A full-stack event management and organiser application for South Indian events, built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Firebase**.

## Features

### Client-Facing (Public)
- **Home** — Hero section, featured event categories, services highlight, testimonials, and CTA
- **Events** — Browse all event types (weddings, Mehandi, Haldi, house warming, engagements, etc.)
- **Services** — Full service catalogue (Nadaswaram bands, orchestras, dance troupes, singers, photographers, catering)
- **Gallery** — Filterable photo gallery with lightbox viewer
- **Booking** — Multi-step booking form with service selection, submitted to Firestore
- **About** — Company story, values, and differentiators
- **Contact** — Contact form with inquiries saved to Firestore

### Admin Panel (Protected)
- **Login** — Firebase Authentication
- **Dashboard** — Stats overview (total/pending/confirmed bookings, unread inquiries, gallery count, services)
- **Bookings** — View, filter, update status, and delete bookings
- **Services** — Add, edit, activate/deactivate, and delete services
- **Gallery** — Add/remove gallery images, mark as featured
- **Inquiries** — View, mark as read, and delete contact form submissions

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 + Tailwind CSS |
| Language | TypeScript |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Storage | Firebase Storage |
| Forms | React Hook Form |
| Notifications | React Hot Toast |

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/mohankumarreshmi/saidurgaevents.git
cd saidurgaevents
npm install
```

### 2. Configure Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password), **Firestore**, and **Storage**
3. Copy `.env.example` to `.env.local` and fill in your Firebase config:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. Create admin user

In Firebase Console → Authentication → Add user with an email and password. Use those credentials to log in at `/admin/login`.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the client site.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Firestore Collections

| Collection | Description |
|---|---|
| `bookings` | Customer booking requests |
| `inquiries` | Contact form submissions |
| `services` | Event services (CRUD by admin) |
| `gallery` | Gallery images (CRUD by admin) |
| `eventCategories` | Event category definitions |

## Event Types Supported

- 💒 Wedding Ceremonies
- 💍 Engagement Functions
- 👰 Bride & Groom Functions
- 🌿 Mehandi Ceremony
- 🌼 Haldi Ceremony
- 🏠 House Warming (Griha Pravesh)
- 🏢 Office Inauguration
- 🎂 Birthday Celebrations
- 👶 Baby Shower
- 🎯 Corporate Events

## Services Offered

- 🎺 Traditional Nadaswaram Band
- 🎸 Orchestra & Live Band
- 💃 Classical Dance Troupe
- 🥁 Folk Dance & Dappu
- 🎤 Professional Singers
- 🌸 Floral & Traditional Decor
- 📸 Photography & Videography
- 🍽️ South Indian Catering
