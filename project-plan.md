# 🛒 Grocery Store MVP (Agentic E-commerce Style) – Full Plan

## 🎯 Project Objective

Build a web-based grocery store MVP with:

- **Admin dashboard** to manage products
- **Customer-facing e-commerce interface**
- **AI Agent assistant** that answers product-related questions

**Stack:**

- **Frontend:** Next.js + Tailwind
- **Backend:** API routes in Next.js (or Express)
- **Database:** Firebase or MongoDB
- **AI Agent:** LangChain + OpenAI (function-calling or tools)
- **Deployment:** Vercel (frontend), Railway/Render (backend)

---

## 🧩 Core MVP Features

### 🛍️ Admin Dashboard

- Add/Edit/Delete Products
- Manage stock quantity
- Upload product images
- View all products

### 🛒 Customer E-commerce UI

- View product list
- Product search and filters
- View product detail page
- Ask the agent about product availability/price

### 🤖 AI Agent Assistant

- Chat-based product support
- Understand questions like:
  - “Do you have sugar?”
  - “What’s the price of eggs?”
  - “Suggest cheap snacks under 100৳”

---

## 🗂️ Project Phases & Sprints

### 🔰 Phase 1 – Project Setup (Day 1–2)

| Task                          | Tool/Notes                       |
|-------------------------------|----------------------------------|
| Initialize Next.js app        | create-next-app + Tailwind CSS   |
| Set up GitHub repo            | GitHub                           |
| Setup Firebase or MongoDB     | Firebase SDK / Mongoose          |
| Create Kanban board           | Trello or Notion                 |
| Plan folder structure         | `/app`, `/components`, `/pages/api` etc. |

---

### 🚀 Phase 2 – Sprint 1: Admin Product Management (Week 1)

**Goal:** Shop owner can add, update, delete products

| Task                   | Description                                  |
|------------------------|----------------------------------------------|
| Design Product schema  | name, price, quantity, description, image, category |
| Create product APIs    | `/api/products` with GET, POST, PUT, DELETE |
| Admin dashboard UI     | `/admin/products` route                     |
| Product form           | Controlled form with validation             |
| Display product table  | Show list with edit/delete buttons          |
| *Optional:* Image upload | Firebase Storage / Cloudinary             |

---

### 🛍️ Phase 3 – Sprint 2: Customer Storefront UI (Week 2)

**Goal:** Customer sees products like an e-commerce site

| Task                   | Description                                  |
|------------------------|----------------------------------------------|
| Product listing page   | Grid with image, name, price                 |
| Product detail page    | `/products/[id]`                             |
| Product search/filter  | By name, category, price                     |
| Add to cart button     | Local state only (non-functional)            |
| Style with Tailwind    | Ensure responsiveness and accessibility      |

---

### 🤖 Phase 4 – Sprint 3: AI Agent Integration (Week 3)

**Goal:** AI chatbot can answer product-related queries

| Task                       | Description                              |
|----------------------------|------------------------------------------|
| Add chat UI                | Floating chatbox, input + output         |
| Install LangChain + OpenAI | Choose agent type (functions/tools)      |
| Create agent tools         | `searchProduct(name)`, `getProductPrice(name)`, `suggestAlternatives(query)` |
| Create `/api/agent`        | POST user query → return AI response     |
| Format agent replies       | “Yes, we have sugar at 65৳/kg. 10 units available.” |
| Test user queries          | “Do you have oil?” “How much is potato per kg?” |

---

### 🧪 Phase 5 – Sprint 4: Polish, Test, Deploy (Week 4)

**Goal:** Prepare product for demo/testing

| Task                   | Description                                  |
|------------------------|----------------------------------------------|
| Test flows             | Add → Search → Ask → Respond                 |
| Polish UI              | Colors, padding, mobile design               |
| Add 10 sample products | For demo purposes                            |
| Deploy frontend        | Vercel                                       |
| Deploy backend         | Render / Railway                             |
| Share demo             | Show to real shopkeeper or friend for feedback |

---

## 📁 Recommended Folder Structure (Next.js)

```bash
/app
  /admin
    /products
  /products
  /chat
  layout.tsx

/components
  ProductCard.tsx
  ProductForm.tsx
  ChatBox.tsx

/pages
  /api
    /products.js
    /agent.js

/lib
  firebase.js / db.js
  agentTools.js

/public
  /images
```

---

## ✅ LangChain Agent Setup (Plan)

| Component         | Role                                             |
|-------------------|--------------------------------------------------|
| LangChain Agent   | Routes product queries                           |
| Tools             | Custom functions: `searchProduct()`, `getProductPrice()` |
| Model             | OpenAI (GPT-4 or GPT-3.5 with function-calling)  |
| Query pipeline    | User input → tool call → response → UI           |

The agent will use a tool-calling mechanism to read your product DB and respond naturally.

---

## ✅ Kanban Task Board (Trello/Notion Setup)

**Columns:**

- Backlog
- This Week
- In Progress
- Testing
- Done
- Bugs/Feedback

**Tasks (You can drag & drop into weekly goals):**

**FRONTEND**

- Product List Page
- Product Detail Page
- Admin Dashboard UI
- Product Form
- Chat UI (Chatbox)

**BACKEND**

- `/api/products` GET/POST/PUT/DELETE
- `/api/agent` endpoint
- DB setup

**AGENT**

- Setup LangChain + OpenAI
- Tool: `searchProduct(name)`
- Tool: `getProductPrice(name)`
- Agent handler function
- Response formatting

**DEPLOYMENT**

- Deploy frontend to Vercel
- Deploy backend to Render
- Add sample products
- Test & get user feedback
