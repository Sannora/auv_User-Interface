# Sualtı Arayüz

A modern underwater vehicle control and monitoring interface built with React (frontend) and Node.js/ZeroMQ (backend). This project provides real-time telemetry, camera streaming, module control, and task management for ROVs (Remotely Operated Vehicles).

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)

---

## Overview

**AUV User Interface** is designed for controlling and monitoring underwater vehicles. It features a real-time dashboard, module controls, camera feed, system telemetry, and interactive map for mission planning and execution.

---

## Screenshots

<img width="1920" height="876" alt="image" src="https://github.com/user-attachments/assets/655dc67b-3210-49a3-8b2f-64e53a7532d0" />

<img width="1920" height="883" alt="image" src="https://github.com/user-attachments/assets/98edf453-55e7-4e80-b9d2-56de8a8d90db" />

<img width="1920" height="828" alt="image" src="https://github.com/user-attachments/assets/ebc47b11-5384-4943-a0ba-3da017c8da53" />


---

## Features

- **Real-time Telemetry:** CPU, GPU, temperature, pressure, depth, leak detection, and more.
- **Camera Streaming:** Live camera feed from the ROV.
- **Module Control:** Start, stop, pause, and reset modules.
- **Task Management:** Assign and monitor tasks such as "Hazine Avı" and "Anomali Tespiti".
- **3D Model Viewer:** Interactive 3D visualization of the vehicle.
- **Map Integration:** Draw routes and track live location using Leaflet.
- **Terminal Output:** View system logs and command responses.
- **Responsive Design:** Optimized for desktop and mobile devices.

---

## Tech Stack

- **Frontend:** React, Vite, Leaflet, Three.js, FontAwesome
- **Backend:** Node.js, Express, ZeroMQ, WebSocket
- **Other:** ESLint, CSS Modules

---

## Project Structure
client/ src/ components/ AngleControl/ Camera/ EngineUnit/ Header/ Layout/ Login/ Map/ Modules/ Navbar/ Settings/ SystemDetails/ TaskManagement/ Terminal/ ThreeDModel/ assets/ App.jsx config.js main.jsx index.css public/ package.json vite.config.js

server/ core/ websocket.js zeromq.js config/ index.js zmq/ publishers/ subscribers/ images/ package.json server.js

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

#### 1. Clone the repository

```
git clone https://github.com/yourusername/auv_User-Interface.git
cd sualti-arayuz

```

2. Install dependencies

Frontend:

```
cd client
npm install
```

Backend:

```
cd ../server
npm install
```

## Usage:
Start the Backend

```
cd server
node server
```

Additional Starts(for ZeroMQ Publishers):

```
cd server/zmq/publishers
node PUBLISHERNAME
```

Start the Frontend

```
cd client
npm run dev
```

Runs the React app on http://localhost:5173 (default Vite port).

## Configuration
Frontend: Edit client/src/config.js for WebSocket and ZeroMQ IP/port settings.
Backend: Edit server/config/index.js for port and IP configuration.

## API Endpoints
Send Command
POST /api/send-command
Body: { "system_code": Number, "command_code": Number }
Description: Sends a command to the ROV via ZeroMQ.

Contact
For questions or support, please open an issue or contact mmh.melih@gmail.com.

Control System:
- [elymsyr/auv_control_system](https://github.com/elymsyr/auv_control_system)
