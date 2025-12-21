# ALON Browser Buddy

**ALON Browser Buddy** is a personalized Chrome extension designed to bring a touch of motivation and companionship to your web browsing experience. It features a digital character named **ALON** who walks along the bottom of your screen and provides uplifting quotes when prompted.

---

## 🚀 Overview
As a computer science student, I built this project to explore **DOM Injection**, **CSS Keyframe Animations**, and **Asynchronous Message Passing** within the Chrome Extension API. ALON is not just a sprite; he is a state-managed element that interacts with the user without interfering with the website's functionality.

---

## ✨ Key Features
* **Smooth Character Animation**: ALON walks smoothly across the viewport using a 40-second linear CSS animation.
* **Non-Flipping Quote Bubble**: A custom "Double Animation" logic ensures that while ALON flips direction, the motivational text remains upright and readable.
* **Funky UI**: The speech bubble features a "hand-drawn" aesthetic with a bold Comic Sans font.
* **On-Demand Motivation**: Clicking the extension icon triggers a random quote from a curated library.

---

## 🛠️ Technical Breakdown

### 📂 File Structure
* `manifest.json`: The core configuration using **Manifest V3**.
* `content.js`: The "Engine" that injects ALON into the page.
* `background.js`: The "Controller" service worker that listens for toolbar icon clicks.
* `style.css`: The "Animator" containing complex keyframes for movement.
* `alon.gif`: The character sprite (optimized with a transparent background).

### 🔧 Core Logic
* **Z-Index Layering**: Uses a maximum `z-index` (2147483647) to stay above all web content.
* **Pointer Events**: The container uses `pointer-events: none` so you can still click links behind ALON.

---

## 📥 Installation

1.  **Clone the Repo**: Download this folder to your local machine.
2.  **Open Extensions**: Go to `chrome://extensions/` in your browser.
3.  **Developer Mode**: Toggle "Developer mode" in the top right.
4.  **Load Unpacked**: Click "Load unpacked" and select this project folder.
5.  **Pin & Use**: Pin the extension and refresh any open website to see ALON!

6.  # DEMO

<img width="1870" height="180" alt="image" src="https://github.com/user-attachments/assets/05bf014e-78f5-41ec-b0bd-7e1655216c5c" />

<img width="757" height="379" alt="image" src="https://github.com/user-attachments/assets/77961958-9b33-4e67-ac0e-bbc660f44893" />


