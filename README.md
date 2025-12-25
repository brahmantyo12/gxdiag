# 🛠️ Project GXDiag (v3.2 Ultimate)

> **The Ultimate Web-Based Hardware Diagnostic Suite & Command Center.**
> A lightweight, modular, and professional tool to test hardware peripherals, network latency, and game account validity directly from your browser.

![Project Banner](screenshots/gxdiag32.jpeg)

## 🔗 Live Demo
🚀 **[Click here to open GXDiag Live](https://gxdiag.brahmantyo12.my.id)**

---

## 🚀 Overview

**Project GXDiag** is a comprehensive hardware diagnostic tool built entirely with **Vanilla HTML5, CSS3, and JavaScript**. It creates a centralized "Command Center" dashboard that aggregates real-time environmental data and provides quick access to **14 specialized testing modules**.

It is designed to be **lightweight, privacy-focused (client-side only), and responsive**. It features **Smart Device Detection**, which automatically filters relevant tools based on whether the user is on a Desktop or Mobile device.

---

## 🎛️ The Command Center (Dashboard)

The main menu (`index.html`) serves as a smart information hub:

### 1. 🕌 Smart Prayer Schedule
* **Auto-Location:** Detects City/District names using **Nominatim (OpenStreetMap)** via Geolocation.
* **Accurate Times:** Uses **Aladhan API** with `Method 20` (Kementerian Agama RI standard).
* **5-Time List:** Displays the full daily schedule (Subuh to Isya) with active time highlighting.

### 2. 📅 Ultimate Interactive Calendar
* **Hybrid Holiday System:**
    * **Fixed:** Hardcoded dates for static holidays.
    * **Dynamic:** Auto-syncs with **API-HariLibur** for changing dates (e.g., SKB 3 Menteri updates, Eid, Nyepi).
* **Hijri Support:** Full Hijriyah calendar with **Manual Moon Sighting Correction** (-1 to +1 days).
* **Smart Events:** Auto-detects Sunnah Fasting (Mon/Thu), Ayyamul Bidh, and Major Islamic Holidays.

### 3. 🎮 Steam Sale Monitor
* **Live Tracker:** Visual indicator if a major Steam Sale is currently **LIVE**.
* **Roadmap:** Displays a countdown to the next sale and a list of future confirmed sales for 2025 based on SteamDB data.

---

## 🧩 Diagnostic Modules (14 Tools)

The suite includes specialized modules divided into 4 categories:

### ⌨️ Input & Hardware
| Module | Description |
| :--- | :--- |
| **Keyboard Tester** | Visualizes keystrokes, detects Ghosting, and checks for switch chatter (<80ms). |
| **Typing Speed** | WPM & Accuracy test supporting multiple languages (EN, ID, JP, CN, KR). |
| **Mouse Tester** | Checks Polling Rate (Hz), button actuation, and scroll wheel steps. |
| **Game Controller** | WebHID support for Sony DualSense/DS4 (touchpad data) & analog drift visualization. |

### 📸 Display & Audio
| Module | Description |
| :--- | :--- |
| **Screen & Cam** | **All-in-One:** Dead Pixel Test, Webcam Check, and **Pixel Repair** (Strobe/Noise to fix burn-in). |
| **Audio System** | Stereo L/R frequency generator (20Hz-20kHz) and Microphone waveform visualizer. |
| **Mobile Sensors** | **Hub:** Visual Bubble Level (Gyroscope), Battery Health monitor, and Vibration/Haptic Tester. |
| **Specs & GPU** | **HDC Detector:** Exposes true GPU Renderer (WebGL) to detect fake/replica phones. |

### 🌐 Network & Connectivity
| Module | Description |
| :--- | :--- |
| **Network Pro** | Real-time Latency (Ping) to Cloudflare, Jitter analysis, Public IP, and Connection Type detection. |
| **NFC Tool** | Reads NFC Tags serial numbers (UID) and records (Android/Chrome only). |
| **Barcode & QR** | Scans 1D Barcodes (Products/Snacks) and 2D QR Codes (QRIS/URL). Includes QR Generator. |

### 🚀 Performance & Utility
| Module | Description |
| :--- | :--- |
| **Benchmark** | **Cross-Platform CPU Stress Test.** Detects device type and adjusts scoring standards (Mobile vs Desktop). |
| **Reflex Test** | Measures reaction time in milliseconds (ms) with ranking system (e.g., "Pro Gamer" vs "Grandma"). |
| **Game Check** | **Tournament Tool:** Validates Game IDs for MLBB, FF, PUBG, Genshin, etc. Supports offline regex fallback. |

---

## 🛠️ APIs & Data Sources

This project relies on the following open-source services:

1.  **[Aladhan API](https://aladhan.com/):** Prayer Times & Hijri conversion.
2.  **[Nominatim (OSM)](https://nominatim.org/):** Reverse Geocoding.
3.  **[API-HariLibur](https://api-harilibur.vercel.app/):** Syncing Indonesia's National Holidays.
4.  **[Ipify](https://www.ipify.org/):** Public IP Address detection.
5.  **[Isan.eu.org](https://api.isan.eu.org/):** Game Nickname Checker API.
6.  **[Cloudflare](https://1.1.1.1/):** Low-latency endpoint for Ping test.

---

## 📂 Project Structure

```text
GXDiag-Project/
├── css/
│   └── style.css            # Global Theme (Dark/Neon)
├── modules/
│   ├── keyboard/            # Ghosting & Chatter Logic
│   ├── typing/              # WPM Logic
│   ├── mouse/               # Polling Rate Logic
│   ├── gamepad/             # WebHID API
│   ├── audio/               # WebAudio Frequency Gen
│   ├── screen-cam/          # Dead Pixel & Repair Tool
│   ├── sensors/             # Gyro, Battery, Vibration
│   ├── specs/               # WebGL Renderer Info
│   ├── network/             # Ping & IP Logic
│   ├── benchmark/           # CPU Prime Crunching
│   ├── nfc/                 # WebNFC Reader
│   ├── qr/                  # HTML5-QRCode Scanner
│   ├── reflex/              # Reaction Time Game
│   └── gameid/              # Tournament ID Validator
├── index.html               # Main Command Center
├── sitemap.xml              # SEO Sitemap
├── LICENSE                  # MIT License File
└── README.md                # Documentation
