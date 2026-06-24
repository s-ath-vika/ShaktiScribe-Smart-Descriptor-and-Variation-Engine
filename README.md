# ShaktiScribe — Smart Descriptor & Variation Engine

A fully responsive, mobile-first web application that utilizes an LLM API framework to instantly transform raw manufacturing specifications into platform-optimized, copy-pasteable marketing descriptions for regional grassroots enterprises.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Backend:** Node.js with Express
- **Database:** MongoDB (Atlas)
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Vercel (Frontend) & Render (Backend)



---

## 📂 System Architecture & Project Structure

```text
himshakti-marketing-hub-project/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable component design system library
│   │   │   ├── Hero.jsx
│   │   │   └── Navbar.jsx
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Dashboard.jsx # Dynamic input form & live generation flow
│   │       ├── History.jsx   # Live streamed ledger records from server
│   │       └── About.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md                 # Global Workspace Manual Documentation
```

---

# 🛠️ How to Run the System Locally

To test the end-to-end full-stack data workflow loop, you must spin up both the backend and frontend application servers simultaneously.

## ⚙️ Part 1: Setting Up the Backend Engine

Open your terminal window and navigate into the backend folder directory:

```bash
cd backend
```

Install the production and development dependencies matching package configurations:

```bash
npm install
```

Initialize your environment configuration variables. Create a local `.env` file based on the provided blueprint:

```bash
cp .env.example .env
```

Boot up the local REST API development server with live reload tracking enabled:

```bash
npm run dev
```

The server engine will initialize and log:

```text
[ShaktiScribe Server Operational Engine] -> Running live on port 5000.
```

---

## 🎨 Part 2: Setting Up the Frontend Portal

Open a second, separate terminal window or tab and step into the frontend workspace folder:

```bash
cd frontend
```

Install the component library dependencies and Tailwind token styling assets:

```bash
npm install
```

Start up the local Vite development web server pipeline:

```bash
npm run dev
```

The builder will compile your components and serve the web interface locally on:

```text
http://localhost:5173
```

---

# 🎛️ REST API Specification (Week 4 CRUD Matrix)

The Node Express application exposes 6 dedicated data model endpoints whitelisted for cross-origin tracking (CORS) with the local React ecosystem:

| HTTP Method | API Route Endpoint            | Context Function Description                                        | Expected Status Codes          |
| ----------- | ----------------------------- | ------------------------------------------------------------------- | ------------------------------ |
| GET         | `/api/descriptions`           | Streams full ledger array of saved marketing listings               | 200 OK                         |
| GET         | `/api/descriptions/:id`       | Fetches a single distinct description entry card by its explicit ID | 200 OK / 404 Not Found         |
| POST        | `/api/descriptions`           | Parses spec payloads, appends fresh listing items to server cache   | 201 Created / 400 Bad Request  |
| PUT         | `/api/descriptions/:id`       | Modifies existing configuration metrics matching parameter ID keys  | 200 OK / 404 Not Found         |
| DELETE      | `/api/descriptions/:id`       | Completely wipes an entry card block from the backend data array    | 204 No Content / 404 Not Found |
| GET         | `/api/descriptions/search?q=` | Case-insensitively filters list arrays by matching text parameters  | 200 OK                         |

```
```
