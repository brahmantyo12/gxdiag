# 🛠️ Project GXDiag (v2.0)

> **The Ultimate Web-Based Hardware Diagnostic Suite.**
> A lightweight, modular tool to test Keyboards, Mice, Gamepads, Audio, and Touchscreens directly from your browser. No installation required.

![Project Banner](screenshots/banner.png)
*(Optional: Replace this with a screenshot of your main menu)*

## 🚀 Overview

**Project GXDiag** is a comprehensive diagnostic utility built with vanilla **HTML5, CSS3, and JavaScript**. It leverages modern browser APIs (Web Audio, Gamepad API, WebHID) to provide accurate hardware testing without the need for heavy desktop software.

Designed for gamers, hardware enthusiasts, and technicians who need a quick, reliable way to verify input devices on any computer.

## ✨ Key Features

### 1. ⌨️ Advanced Keyboard Tester
* **Full Layout Visualizer:** Supports standard 104-key layouts with **Auto-Scale** logic to fit any screen size perfectly.
* **N-Key Rollover (Ghosting):** Detects how many simultaneous keys can be registered.
* **Chatter Detection:** Algorithmic detection for double-typing switches (Threshold: <80ms).
* **Layout Support:** Toggle between **ANSI** and **ISO** layouts.
* **Audio Feedback:** Satisfying "clicky" sound feedback generated via Web Audio API.

### 2. 🎮 Pro Controller Diagnostic
* **Dual API Support:**
    * **Standard Gamepad API:** Works with Xbox, PlayStation, and Generic controllers.
    * **Sony WebHID:** Reads **Raw Touchpad Data** (Finger coordinates) from DualShock 4 and DualSense controllers via USB.
* **Deadzone & Drift Visualizer:** Precise analog stick and trigger readout (0.00 - 1.00 float precision).
* **Haptic Feedback:** Test vibration motors (Rumble).
* **Paddle Support:** Visualizers for back paddles (P1-P4) on Elite/Pro controllers.

### 3. 🖱️ Mouse & Touchpad
* **Polling Rate Checker:** Real-time Hertz (Hz) counter to measure mouse report rate.
* **Button Check:** Test Left, Right, Middle, and Side buttons (Forward/Back).
* **Multi-Touch Canvas:** Test up to 10 simultaneous touch points with pressure sensitivity support (for Stylus/Pen).

### 4. ⚡ Typing Speed Challenge
* **WPM Test:** 60-second typing challenge to measure Words Per Minute.
* **Accuracy Tracker:** Highlights correct and incorrect keystrokes in real-time.

### 5. 🔊 Audio System
* **Stereo Output Test:** Independent Left/Right channel frequency generation.
* **Microphone Visualizer:** Real-time waveform rendering to test audio input clarity.

---

## 📂 Project Structure

The project is organized into modular sections for better scalability and performance:

```text
GXDiag-Project/
├── css/
│   └── style.css          # Global Theme & Reset
├── modules/
│   ├── keyboard/          # Keyboard Logic & Layout
│   ├── mouse/             # Mouse & Polling Rate Logic
│   ├── gamepad/           # Controller & WebHID Logic
│   ├── typing/            # WPM Challenge Logic
│   └── audio/             # Mic & Speaker Tests
├── index.html             # Main Dashboard (Hub)
└── README.md              # Documentation
