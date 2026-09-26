# FitLog — Gym & Workout Companion

FitLog is a modern, responsive gym and workout tracker web application built with **Next.js (App Router)** and **Tailwind CSS** for **Programming Hero Assignment-06**. It allows users to browse an extensive library of gym exercises, inspect detailed execution instructions, build daily workout plans with a 5-item limit, save exercises for later, and monitor real-time workout metrics.

---

## 🔗 Project Links

- **Live Deployment:** [https://assignment-06-wine.vercel.app/](https://assignment-06-wine.vercel.app/)
- **GitHub Repository:** [https://github.com/abunayem04/Assignment-06](https://github.com/abunayem04/Assignment-06)

---

## 🌟 Key Features

- **🏋️‍♂️ Workout Library Grid:** Fetches exercise data dynamically from an external REST API with a custom loading indicator.
- **🔍 Dynamic Route (`/workout/[id]`):** Dedicated workout details page displaying target muscle groups, technical specifications (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating), and ordered step-by-step instructions.
- **📅 Daily Plan Management (Max 5 Limit):** Users can add exercises to today's plan with strict cap validation (maximum 5 workouts) and duplicate prevention alerts.
- **🔖 Bookmark & Save:** Save workouts for future training sessions with dedicated tabs to switch between Today's Plan and Saved exercises.
- **📊 Real-time Metric Statistics:** Instant calculation of total exercises, total workout duration (minutes), and total calories burned.
- **✅ Completion Status Tracking:** Mark exercises as done with visual indicators, completion badges, and interactive feedback.
- **🔀 Multi-criteria Sorting:** Dynamic sorting on both Home and Plan pages by Duration (min), Calories (kcal), or Rating.
- **💾 LocalStorage Synchronization:** Seamless state persistence across page refreshes using React Context API and browser LocalStorage.
- **📱 Fully Responsive Design:** Clean dark-mode interface with mobile navigation drawer for smartphones, tablets, and desktops.
- **🚫 Custom 404 Page:** Branded Not Found page with return-to-library redirection.

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS & Custom CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Typography:** Google Fonts (Oswald & Inter)
- **Deployment Platform:** Vercel

---

## 🚀 How to Run Locally

Follow these steps to run the project in your local development environment:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abunayem04/Assignment-06.git
   cd Assignment-06
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👨‍💻 Developer Information

- **Submitted by:** Abu Nayem
- **Course:** Programming Hero — Next.js Course
- **Assignment:** Assignment 06 (FitLog Workout Tracker)
