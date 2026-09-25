# FitLog — Train With Intent. Log Every Set.

FitLog is a modern, dark-themed gym companion web application built with Next.js and Tailwind CSS. It allows fitness enthusiasts to explore a curated library of workouts, inspect key specifications and step-by-step instructions, organize daily training plans, track workout metrics, and save routines for later.

## 🚀 Live Demo & Repository
- **Live Site**: [Add your deployed Vercel / Netlify Link here]
- **GitHub Repository**: [Add your GitHub Repo Link here]

---

## 🛠️ Technologies Used
- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State & Storage**: React Context API & LocalStorage
- **Data Source**: FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`)

---

## ✨ Key Features

1. **Complete Workout Library Grid (Home Page)**
   - Fetches and renders 12 major lifts covering every muscle group in a responsive 3x4 grid.
   - Interactive category tags (e.g., Chest, Arms, Core, Legs) with instant filter buttons.
   - Detailed stat indicators for duration, calories burned, and community ratings.

2. **Workout Details Page with Key Specs & Instructions**
   - Clean two-column layout showing workout media on the left and full specifications on the right.
   - Comprehensive Key Specs table (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating).
   - 4-step numbered execution instructions.
   - Direct action buttons to "Add to today's plan" and "Save for later" with instant toast alerts.

3. **Dynamic Daily Plan & Metrics Summary (`/my-plan`)**
   - Real-time stat summary cards tracking total **Exercises**, total **Minutes**, and total **Calories** burned.
   - Today's Plan and Saved tabs with item counters.
   - "Mark as Done" toggle with visual completion indicators.
   - "Remove (X)" button to manage items easily.
   - Clean empty state with quick navigation when no items are added.

4. **Multi-Criteria Sorting & Live Search**
   - Sort workouts on both the Home and My Plan pages by **Duration**, **Calories**, or **Rating**.
   - Instant search bar to quickly filter workouts by name or equipment.

5. **State Persistence & 5-Lift Plan Cap**
   - All plan items and saved workouts are saved in `localStorage`, so your progress stays intact even after page reloads.
   - Built-in 5-lift cap for daily plans with toast warning alerts.
   - Fully custom **404 Not Found Page** for unmatched routes.

---

## 💻 Getting Started Locally

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd Assignment-6
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
