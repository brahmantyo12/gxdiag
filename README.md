# 🛠️ Project GXDiag (v3.2)

> **The Ultimate Web-Based Hardware Diagnostic Suite & Command Center.**
> A lightweight, modular, and professional tool to test hardware peripherals and monitor system events directly from your browser.

![Project Banner](screenshots/banner.png)
*(Optional: Replace this with a screenshot of your new Command Center)*

## 🚀 Overview

**Project GXDiag** has evolved from a simple tester into a comprehensive **Diagnostic Suite**. It features a powerful "Command Center" dashboard that aggregates real-time data (Time, Prayer Schedules, Calendars, Gaming Events) and provides access to 8 specialized hardware testing modules.

Built entirely with **Vanilla HTML5, CSS3, and JavaScript**, ensuring zero dependencies and maximum performance on any device (Desktop & Mobile).

## 🎛️ The Command Center (Dashboard)

The main menu (`index.html`) is no longer just a list of links. It is now a fully functional smart dashboard featuring:

### 1. 🕌 Smart Prayer Schedule
* **Real-time Coordinates:** Detects user location (City/District) via Geolocation API & OpenStreetMap.
* **Kemenag Standard:** Uses `Method 20` (Kemenag RI) via **Aladhan API** for accurate prayer times in Indonesia.
* **5-Time List:** Displays full schedule (Subuh - Isya) with active time highlighting.

### 2. 📅 Ultimate Interactive Calendar
* **Hybrid Holiday System:** Combines hardcoded fixed holidays (fast loading) with **Auto-Sync** from `api-harilibur` (for changing dates like SKB 3 Menteri updates).
* **Hijri Support:** Full Hijriyah calendar with **Manual Moon Sighting Correction** (Koreksi Hilal -2 to +2 days) saved in local storage.
* **Islamic Events:** Auto-detects Sunnah Fasting (Mon/Thu), Ayyamul Bidh, and Major Holidays (Eid, Ramadhan).
* **Javanese Weton:** Displays Pasaran (Legi, Pahing, etc.) for local context.

### 3. 🎮 Steam Sale Monitor
* **Live Tracker:** Detects if a major Steam Sale is currently **LIVE**.
* **Roadmap:** Displays a countdown to the next sale and a list of future confirmed sales for 2025 (Spring, Summer, Autumn, Winter).

---

## 🧩 Diagnostic Modules

The suite includes **8 Specialized Modules** to test every aspect of your device:

### 1. ⌨️ Keyboard Tester
* **Ghosting & Chatter Check:** Visualizes active keystrokes and detects double-typing switches (<80ms).
* **Auto-Scale:** Automatically fits the full 104-key layout to any screen size.

### 2. ⚡ Typing Speed
* **Multi-Language:** Supports English, Indonesian, Japanese, Chinese, Korean, etc.
* **WPM & Accuracy:** Real-time calculation of Words Per Minute.

### 3. 🖱️ Mouse & Touch
* **Polling Rate (Hz):** Real-time sensor reporting rate checker.
* **Multi-Touch:** Test up to 10 simultaneous touch points.

### 4. 🎮 Game Controller
* **WebHID Support:** Native support for Sony DualShock/DualSense (read raw touchpad data).
* **Drift Visualizer:** Precise float precision (0.00 - 1.00) for analog sticks and triggers.

### 5. 🔊 Audio System
* **Stereo Check:** Independent Left/Right channel frequency generator.
* **Mic Visualizer:** Real-time waveform rendering for microphone input.

### 6. 📱 Mobile Sensors (New)
* **Gyroscope & Tilt:** Bubble level visualizer using device orientation.
* **Battery Health:** Charging status and percentage monitor.

### 7. 🖥️ Screen & Cam (New)
* **Dead Pixel Test:** Fullscreen color cycling (Red, Green, Blue, White, Black).
* **Webcam Info:** Checks camera resolution and stream capability.

### 8. 🔍 Specs & GPU Inspector (New)
* **HDC/Fake Detector:** The "Killer Feature" to detect fake phones (HDC).
* **WebGL Renderer:** Exposes the true GPU name (e.g., "Mali-400" on a fake iPhone vs "Apple GPU" on a real one).

---

## 📂 Project Structure

```text
GXDiag-Project/
├── css/
│   └── style.css            # Global Theme (Dark/Neon)
├── modules/
│   ├── keyboard/            # Ghosting & Layout Logic
│   ├── typing/              # WPM & Language Logic
│   ├── mouse/               # Polling Rate Logic
│   ├── gamepad/             # WebHID & Gamepad API
│   ├── audio/               # WebAudio API Logic
│   ├── sensors/             # Gyro & Battery API
│   ├── screen-cam/          # Fullscreen & MediaStream
│   └── specs/               # WebGL & Hardware Info
├── index.html               # Main Command Center
└── README.md                # Documentation
