# 🐾 Alon Pet v2.5 - Your Browser Companion

**Alon Pet** is a fun, interactive Chrome Extension that adds a digital companion to your browsing experience. Alon walks across your screen, reacts to your activity, and keeps you motivated with quotes.

> **v2.5 Update:** Now features automatic sleep states, random funny reactions (jumping, eating money), and a full control panel!

---

## ✨ Features

### 🧠 Smart Behavior
* **Walking Mode**: Alon patrols the bottom of your screen with a smooth 40-second walk cycle.
* **Idle Sleep System**: If you don't move your mouse for **2 minutes**, Alon automatically pulls out a sleeping bag and takes a nap. He wakes up instantly when you move the cursor!
* **Random Reactions**: Every 60–120 seconds, Alon might spontaneously **Jump** or **Eat Money** to keep things interesting.

### 🎮 Interactive Control Panel
* **Manual Triggers**: Use the extension popup menu to force Alon to:
    * 🦘 **Jump**
    * 💸 **Eat Money**
    * 💤 **Sleep**
* **Motivation**: Click the "Get Quote" button (or click Alon himself) to see a motivational message.

### 🎨 Visuals
* **Smooth Transitions**: Animations switch seamlessly between walking, sleeping, and jumping states without glitching.
* **Non-Intrusive**: Alon stays at the bottom of the page and ignores mouse clicks unless you specifically interact with him.
* **Directional Flipping**: He faces the direction he is walking!

---

## 🛠️ Installation Guide

1.  **Clone or Download** this repository to your computer.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer Mode** (toggle switch in the top right corner).
4.  Click the **Load Unpacked** button.
5.  Select the folder where you saved these files.
6.  **Pin the Extension**: Click the puzzle piece icon in Chrome and pin **Alon Pet v2.5** to your toolbar.

---

## 📂 Project Structure

| File | Description |
| :--- | :--- |
| **manifest.json** | The configuration file (Manifest V3) that defines permissions and assets. |
| **content.js** | The "Brain" of the project. Contains the `PetController` class which handles the state machine (Walking/Sleeping/Jumping) and timers. |
| **style.css** | Handles the CSS animations, flipping logic, and positioning. |
| **popup.html/js** | The Control Panel UI that appears when you click the extension icon. |
| **background.js** | Service worker that manages browser events and alarms. |
| **Assets** | `alon.gif`, `alon-jump.gif`, `alon-sleep.gif`, `alon-money.gif`. |

---

## 💻 Tech Stack

* **JavaScript (ES6+)**: Uses Classes and Event Listeners for clean state management.
* **CSS3**: Uses Keyframes and CSS Variables for performant animations.
* **Chrome Extension API**: Uses `runtime.sendMessage` and `tabs.sendMessage` for communication between the Popup and the Content Script.

---

## 🚀 Future Roadmap

* [ ] **Custom Skins**: Allow users to upload their own character sprites.
* [ ] **Stats Tracker**: Count how many miles Alon has walked.
* [ ] **Sound Effects**: Add optional cute sounds for jumping and eating.

---

*Vibe Coded by Kaizen*
