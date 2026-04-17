# JujutsuTech: Python-Powered Deepfake Detection

A high-performance deepfake detection system utilizing **Machine Learning**, neural expansion, and digital forensics. Built with **Python (FastAPI)**, React, and PyTorch.

## 🚀 Features

- **Six Eyes Protocol**: Real-time **Deep Learning** analysis of images for synthetic artifacts.
- **Resonance Scanner**: Multi-stage **Machine Learning** pipeline (Wavelet, Neural Flow, ELA).
- **Domain Expansion**: Isolated processing environment for secure scans.
- **System Archives**: Full history of performed scans with detailed reports.
- **Premium Rituals**: Subscription-based high-tier access (Simulation).

## 🛠️ Technology Stack

- **Backend**: Python, FastAPI, SQLAlchemy, PyTorch, Transformers, OpenCV.
- **Frontend**: React 19, TypeScript, Vite, Framer Motion, Tailwind CSS.
- **Database**: PostgreSQL.
- **Infrastructure**: Docker & Docker Compose.

## 📦 Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose installed.
- (Optional) [Node.js 20+](https://nodejs.org/) and [Python 3.11+](https://www.python.org/) for local development.

## 🚦 Quick Start (Docker)

The easiest way to run the project is using Docker Compose.

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd "deep fake detection"
    ```

2.  **Configure Environment Variables**:
    Copy the example environment file and fill in your keys (especially `HF_TOKEN`).
    ```bash
    cp .env.example .env
    ```

3.  **Start the system**:
    ```bash
    docker compose up --build
    ```

4.  **Access the Domain**:
    - **Frontend**: [http://localhost](http://localhost)
    - **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🔧 Local Development Setup

### Backend

1.  Navigate to `backend/`:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the API:
    ```bash
    uvicorn main:app --reload
    ```
    *(Note: If running from the root directory, use `uvicorn backend.main:app --reload`)*

### Frontend

1.  Navigate to `frontend/`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## � Technical Architecture

To explain the system accurately, here is the technical flow:

1.  **Hybrid Detection Engine**:
    -   **Neural Analysis**: Uses the **Hugging Face Inference API** (model: `umm-maybe/AI-image-detector`) for deep learning-based detection of synthetic patterns.
    -   **Digital Forensics**: Implements **Error Level Analysis (ELA)** to detect compression inconsistencies, identifying local image manipulations.
2.  **Frontend**: React 19 + TypeScript + Framer Motion (animations) + Tailwind CSS.
3.  **Backend**: FastAPI (asynchronous Python) + SQLAlchemy (ORM).
4.  **Database**: PostgreSQL for storing scan history and user data.

## �🔐 Environment Variables

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string. |
| `SECRET_KEY` | Secure key for JWT signing. |
| `HF_TOKEN` | **Required**: Hugging Face token for the Inference API. |

## 🤗 Hugging Face Integration

This project uses the **Hugging Face Inference API** for real-time deepfake detection. This keeps the Docker image lightweight and eliminates the need for high-end local hardware.

1.  Create a free account at [huggingface.co](https://huggingface.co/).
2.  Go to **Settings > Access Tokens**.
3.  Create a new token with `read` permissions.
4.  Add this token to your `.env` file as `HF_TOKEN`.

## 📁 Folder Structure

```
├── backend/            # FastAPI source code
│   ├── database/       # DB configuration
│   ├── models/         # SQLAlchemy models
│   ├── routes/         # API endpoints
│   ├── utils/          # Logic & Security
│   └── main.py         # Entry point
├── frontend/           # React source code
│   ├── src/            # Components & App logic
│   └── public/         # Static assets
└── docker-compose.yml  # Orchestration
```

## 📜 License

Authorized Sorcerer License. For educational purposes only.
# DEEP-FAKE-IMAGE
