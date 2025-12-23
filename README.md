# ⌨️ Ultimate Input Tester

A comprehensive web-based diagnostic tool designed to test Keyboards, Mice, and Gamepads directly in the browser. Built with vanilla HTML, CSS, and JavaScript.

[**🔴 LIVE DEMO**](https://gxdiag.brahmantyo12.my.id/) 

![Screenshot](screenshot.png)

## ✨ Features

### 1. Keyboard Diagnostics
* **Visual Layouts:** Supports ANSI & ISO layouts (Toggleable).
* **N-Key Rollover Test:** Detects "Ghosting" capabilities with a live counter of simultaneous key presses.
* **Chatter Detection:** Algorithmic detection for double-typing switches (< 80ms threshold).
* **Analysis:** Tracks Keystrokes Per Minute (KPM) and unique keys pressed.

### 2. Gamepad / Controller Tester
* **Plug & Play:** Uses the HTML5 Gamepad API.
* **Analog Precision:** Visualizer for drift detection and deadzone checking.
* **Full Mapping:** Supports standard Xbox/PS layouts including triggers and D-Pad.
* **Pro Features:** Visual placeholders for back paddles (Elite/Scuf controllers).

### 3. Mouse & Touchpad
* **Mouse Check:** Visualizes Left, Right, Middle, Back, and Forward buttons.
* **Touchpad Tracker:** Real-time X/Y coordinate tracking and scroll gesture detection.

### 4. Audio Feedback
* **Generated Sound:** Uses Web Audio API to generate synthetic "clicky" sounds (White Noise Burst) without external assets to ensure fast loading times.

## 🛠️ Tech Stack
* **HTML5** (Semantic structure)
* **CSS3** (Flexbox & Grid layout, responsive design)
* **JavaScript (ES6+)** (Event listeners, Gamepad API, AudioContext API)

## 🚀 How to Run
Simply open `index.html` in any modern web browser. No installation or server required.

---
*Created by [Nama Kamu]*
