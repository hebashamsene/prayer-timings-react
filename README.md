# React Prayer Timings

A simple React application to display daily Islamic prayer times and a countdown to the next prayer using the Aladhan API.

## 📌 About the Project

This project is a React application built with **Vite** and **Material-UI** that fetches accurate daily prayer times for selected cities and displays a live countdown timer for the upcoming prayer.

## 🚀 Features

* Fetches real-time prayer timings via Aladhan API.
* Dynamic city selection with automatic time update.
* Live countdown timer for the next prayer.
* Clean UI styled with Material-UI (MUI) components.

## 🛠️ Technologies Used

* React (Vite)
* JavaScript (ES6+)
* React Hooks (`useState`, `useEffect`)
* Material-UI (MUI)
* Axios
* Moment.js


⚙️ Installation
Clone the repository:

git clone [https://github.com/hebashamsene/prayer-times-app.git](https://github.com/hebashamsene/prayer-times-app.git)

Go to the project folder:

Bash
cd prayer-times-app
Install the dependencies:

Bash
npm install
Start the application:

Bash
npm run dev
The application will run locally at:

Plaintext
http://localhost:5173

🎯 Learning Goals
This project was created to practice:

Fetching data from REST APIs using axios.

Working with complex time calculations and countdown timers using moment.js.

Managing component side effects with useEffect.

Building elegant layouts using Material-UI components.

## 🖥️ Project Preview
![Prayer Times Preview 1](images/111.png)
![Prayer Times Preview 2](images/222.png)

## 🔮 Future Roadmap

- [ ] **Automatic Daylight Saving Time Adjustment:** Implement automatic DST detection and offset handling for countries with seasonal time shifts.
- [ ] **Global Location Support:** Expand the city selector to include all major international cities and countries.
- [ ] **Geolocation Auto-Detection:** Automatically detect the user's current city/country using Browser Geolocation API.
- [ ] **Azan Audio Notifications:** Add full Azan audio playback options for prayer time alerts.

🖥️ Project Preview
👩‍💻 Author
Heba Shamsene

GitHub: @hebashamsene
