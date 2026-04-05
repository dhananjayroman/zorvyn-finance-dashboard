# Finance Dashboard Frontend

This directory contains the user interface for the Finance Dashboard. It is built as a single-page application using **React.js, Vite, and Tailwind CSS**.

## 🚀 Key Features

*   **Role-based Access Control:** A specialized Mock Context logic allows the user to switch seamlessly between `Admin` and `Viewer` accounts. `Viewer` accounts render a safe read-only interface, removing Add, Edit, and Delete action buttons to prevent mutations.
*   **Dynamic Validated Modals:** Extracted, modular Tailwind UI forms wrap transaction adding and editing logically inside isolated screen-locked modals.
*   **Toast Notifications:** A bespoke notification system floats UI success messages up from the bottom right silently.
*   **Responsive Dashboard Layout:** Built out using complex CSS Grid layout architecture mixed with Flexbox ensuring a perfect visual appearance across desktop laptops down to mobile devices.
*   **Recharts Integration:** High-quality math computations mapped seamlessly over elegant visual SVG `AreaChart` and `PieChart` implementations on the Home overview page.

## 🛠️ Technology Stack

*   **Framework:** [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v3.4](https://tailwindcss.com/)
*   **Routing:** `react-router-dom`
*   **Icons:** `lucide-react`
*   **Charts:** `recharts`

## ⚙️ Getting Started

### Prerequisites
Make sure your API server is turned on (`Backend` directory) operating on `http://localhost:5000`.

### Installation & Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application configures itself on the fastest available port typically spanning `http://localhost:5173/`.

## 📂 Architecture & Explanation

### Central React Context Layers (`src/context/`)
The underlying state engine handling logic separated from layout.
*   **`TransactionContext.jsx`:** The core connectivity brain of the app that interfaces with the Backend API. Under the hood, this Provider uses `useReducer` to manage the exact layout matrix (`transactions`, `loading`, `error` parameters). When you add/delete, it hits the endpoints mapping native MongoDB `_id` variants into React's standard `id` requirements cleanly. 
*   **`AuthContext.jsx`:** An isolated state providing global availability of "Is the user an Admin or a Viewer?", exporting an easy destructurable generic variable `isAdmin`.
*   **`ThemeContext.jsx`:** Tracks dark/light modes appending the physical `'dark'` string to Tailwind's global HTML body classes allowing automatic cascading dark designs.

### Core Layout Routing (`App.jsx`)
Determines the physical framing using `react-router-dom`. Standard components like `Sidebar` and `Navbar` are placed strategically outside `<Routes />` to avoid dismounting on navigation.

### Resusable Components (`src/components/`)
*   **`RoleSwitcher.jsx`:** A bespoke button toggler rendering shielded Admin/Viewer labels.
*   **`TransactionTable.jsx`:** An isolated pure function taking in mapped Arrays to render large amounts of data using complex loops while keeping `TransactionsPage` physically minimal. Contains dynamic hiding of its final `Actions` column depending strictly on the passed `isAdmin` prop.
*   **`TransactionForm.jsx`:** Highly responsive Form logic preventing overlapping Submissions manually via an `isSubmitting` tracking boolean while dynamically rendering inputs into clean rows.
*   **`Toast.jsx`:** Reusable overlay message layer relying heavily on Tailwind `animate-in` frames providing beautiful slide-in features.

### View Pages (`src/pages/`)
The visual endpoints assigned via `App.jsx`.
*   **`DashboardPage.jsx`:** The mathematical calculation center analyzing all global Context arrays reducing them perfectly into totals rendered inside card interfaces alongside Recharts.
*   **`TransactionsPage.jsx`:** Acts strictly as the Controller for interactions orchestrating Table loops, form visibility, local search filtering arrays, and passing data directly to Context dispatches.
