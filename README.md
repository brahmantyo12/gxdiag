# 🛠️ Project GXDiag (v3.2)

> **The Ultimate Web-Based Hardware Diagnostic Suite & Command Center.**
> A lightweight, modular, and professional tool to test hardware peripherals and monitor system events directly from your browser.

![Project Banner](screenshots/banner.png)

## 🔗 Live Demo
🚀 **[Click here to open GXDiag Live](https://gxdiag.brahmantyo12.my.id)**

---

## 🚀 Overview

**Project GXDiag** is a comprehensive hardware diagnostic tool built entirely with **Vanilla HTML5, CSS3, and JavaScript**. It creates a centralized "Command Center" dashboard that aggregates real-time environmental data (Time, Prayer Schedules, Calendars, Gaming Events) and provides quick access to 8 specialized hardware testing modules.

It is designed to be **lightweight, privacy-focused (client-side only), and responsive** for both Desktop and Mobile devices.

---

## 🎛️ The Command Center (Dashboard)

The main menu (`index.html`) serves as a smart information hub:

### 1. 🕌 Smart Prayer Schedule
* **Auto-Location:** Detects City/District names using **Nominatim (OpenStreetMap)** via Geolocation.
* **Accurate Times:** Uses **Aladhan API** with `Method 20` (Kementerian Agama RI standard).
* **5-Time List:** Displays the full daily schedule (Subuh to Isya) with active time highlighting.

### 2. 📅 Ultimate Interactive Calendar
* **Hybrid Holiday System:**
    * **Fixed:** Hardcoded dates for static holidays (e.g., Independence Day).
    * **Dynamic:** Auto-syncs with **API-HariLibur** for changing dates (e.g., SKB 3 Menteri updates, Eid, Nyepi).
* **Hijri Support:** Full Hijriyah calendar with **Manual Moon Sighting Correction** (Koreksi Hilal -2 to +2 days) saved in local browser storage.
* **Smart Events:** Auto-detects Sunnah Fasting (Mon/Thu), Ayyamul Bidh, and Major Islamic Holidays.
* **Local Culture:** Displays "Weton" (Javanese Pasaran: Legi, Pahing, etc.).

### 3. 🎮 Steam Sale Monitor
* **Live Tracker:** Visual indicator if a major Steam Sale is currently **LIVE**.
* **Roadmap:** Displays a countdown to the next sale and a list of future confirmed sales for 2025 (Spring, Summer, Autumn, Winter) based on SteamDB data.

---

## 🧩 Diagnostic Modules

The suite includes **8 Specialized Modules** to test every aspect of your device:

| Module | Icon | Description |
| :--- | :---: | :--- |
| **Keyboard Tester** | ⌨️ | Visualizes keystrokes, detects Ghosting, and checks for switch chatter (<80ms). |
| **Typing Speed** | ⚡ | WPM & Accuracy test supporting multiple languages (EN, ID, JP, CN, KR, etc.). |
| **Mouse & Touch** | 🖱️ | Checks Polling Rate (Hz), button actuation, and Multi-touch points. |
| **Game Controller** | 🎮 | WebHID support for Sony DualSense/DS4 (touchpad data) & analog drift visualization. |
| **Audio System** | 🔊 | Stereo L/R frequency generator and Microphone waveform visualizer. |
| **Mobile Sensors** | 📱 | Visual Bubble Level (Gyroscope) and Battery health/charging monitor. |
| **Screen & Cam** | 📸 | Dead Pixel test (RGBW cycling) and Webcam resolution checker. |
| **Specs & GPU** | 🔍 | **HDC Detector:** Exposes true GPU Renderer (WebGL) to detect fake/replica phones. |

---

## 🛠️ APIs & Data Sources

This project relies on the following open-source services:

1.  **[Aladhan API](https://aladhan.com/):** Prayer Times & Hijri conversion.
2.  **[Nominatim (OSM)](https://nominatim.org/):** Reverse Geocoding (Coordinates to City Name).
3.  **[API-HariLibur](https://api-harilibur.vercel.app/):** Syncing Indonesia's National Holidays (SKB 3 Menteri).
4.  **[SteamDB](https://steamdb.info/):** Source data for Steam Sale schedule logic.

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
├── LICENSE                  # MIT License File
└── README.md                # Documentation
