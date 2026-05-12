# JujutsuTech: Python-Powered Deepfake Detection

A high-performance deepfake detection system utilizing **Machine Learning**, neural expansion, and digital forensics. Built with **Python (FastAPI)**, React, and PyTorch.

## 🚀 Features

- **Six Eyes Protocol**: Real-time **Deep Learning** analysis of images for synthetic artifacts.
- **Resonance Scanner**: Multi-stage **Machine Learning** pipeline (Wavelet, Neural Flow, ELA).
- **Domain Expansion**: Isolated processing environment for secure scans.
- **System Archives**: Full history of performed scans with detailed reports.
- **Premium Rituals**: Subscription-based high-tier access (Simulation).

## ⚠️ The Problem: Why JujutsuTech?

In an era of rapid AI advancement, the line between reality and synthetic media has blurred. **Deepfakes** and manipulated images are becoming a massive financial burden for digital platforms.

A major rising threat is **Refund Fraud**:
- **Fake Evidence**: Scammers use AI-generated images of "spoiled food," "missing items," or "damaged packages" to trick companies like **Swiggy, Zomato, and Amazon** into issuing unearned refunds.
- **Scale**: These scams are often automated or shared in groups, costing businesses millions in fraudulent payouts.
- **Accessibility**: High-quality fake images are now easy to create, making traditional manual verification impossible for high-volume delivery platforms.

Traditional verification methods are no longer sufficient. Detecting synthetic artifacts requires specialized high-performance computing and complex forensic analysis, which are often inaccessible to the average user.

## 🎯 Our Mission: Reclaiming Truth

**JujutsuTech** was built to provide a **defense layer** for businesses and individuals. Our goal is to provide a **powerful, accessible, and user-centric** platform for deepfake detection, specifically designed to identify fraudulent evidence in seconds.

The system leverages:
1.  **Forensic Precision**: Using Error Level Analysis (ELA) to find hidden "glitches" in digital files.
2.  **AI vs AI**: Deploying state-of-the-art Neural Networks to recognize the subtle biological and digital signatures of synthetic generators.
3.  **Accessibility**: A clean, intuitive interface that makes high-end forensics as simple as a single click.

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

> [!TIP]
> **Windows Users**: If you get an error saying "scripts are disabled on this system" when activating the virtual environment, run this command in PowerShell as Administrator once:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Backend

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
    ```bash
    # Linux/macOS:
    python3 -m venv venv
    source venv/bin/activate

    # Windows (PowerShell):
    python -m venv venv
    .\venv\Scripts\Activate.ps1

    # Windows (Command Prompt):
    python -m venv venv
    venv\Scripts\activate
    ```
3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure environment**:
    Create a `.env` file in the `backend/` folder:
    ```bash
    cp .env.example .env
    ```
    **CRITICAL STEP**: Open `backend/.env` and fill in the values. Get the credentials from the project owner (Prasanth):
    ```env
    DATABASE_URL=<ask Prasanth for the database URL>
    SECRET_KEY=<ask Prasanth for the secret key>
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    HF_TOKEN=<your own free token from huggingface.co -> Settings -> Access Tokens>
    ```
5.  **Run the API**:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at [http://localhost:8000](http://localhost:8000).


    #### 2nd method

    cd backend
    # Follow the virtual environment activation steps above based on your OS.
    # (Example for Linux: source venv/bin/activate)
    # (Example for Windows PowerShell: .\venv\Scripts\Activate.ps1)
    pip install -r requirements.txt
    uvicorn main:app --reload




### Frontend

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The frontend will be available at [http://localhost:5173](http://localhost:5173).

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

---

# THESIS DOCUMENTATION: DEEPFAKE IMAGE DETECTION SYSTEM

## CHAPTER 4: IMPLEMENTATION

### 4.1 User Authentication System
The system implements a secure authentication layer using FastAPI, JWT (JSON Web Tokens), and Bcrypt for password hashing.

**Login and Signup APIs (`backend/routes/auth.py`):**
```python
@router.post("/signup")
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user_data.password)
    new_user = User(name=user_data.name, email=user_data.email, password=hashed_password, age=user_data.age)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
```

**Security and Hashing (`backend/utils/security.py`):**
```python
from bcrypt import hashpw, gensalt, checkpw

def get_password_hash(password: str) -> str:
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
```

> **[SCREENSHOT PLACEHOLDER: LOGIN PAGE]**
> **[SCREENSHOT PLACEHOLDER: SIGNUP PAGE]**

### 4.2 Image Upload and Processing
The backend handles multipart/form-data for image uploads and performs initial validation.

**Image Upload API (`backend/routes/detection.py`):**
```python
@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    contents = await file.read()
    result = process_image_cv2(contents)
    return {"filename": file.filename, "result": result}
```

> **[SCREENSHOT PLACEHOLDER: UPLOAD PAGE]**

### 4.3 Hugging Face Model Integration
The system integrates the `umm-maybe/AI-image-detector` model from Hugging Face via their Inference API.

**AI Model Integration (`backend/utils/detection.py`):**
```python
API_URL = "https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector"
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def process_image_cv2(image_bytes: bytes):
    response = requests.post(API_URL, headers=headers, data=image_bytes)
    ai_results = response.json()
    # Logic to handle model loading (503) or errors
    return ai_results
```

### 4.4 Error Level Analysis (ELA) Implementation
ELA is used to detect digital manipulation by identifying inconsistencies in JPEG compression levels.

**ELA Processing (`backend/utils/detection.py`):**
```python
def get_ela(image_bytes, quality=90):
    original = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    buffered = io.BytesIO()
    original.save(buffered, format="JPEG", quality=quality)
    resaved = Image.open(io.BytesIO(buffered.getvalue()))
    ela_image = ImageChops.difference(original, resaved)
    
    extrema = ela_image.getextrema()
    max_diff = max([ex[1] for ex in extrema]) or 1
    scale = 255.0 / max_diff
    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)
    
    output = io.BytesIO()
    ela_image.save(output, format="JPEG")
    return output.getvalue()
```

> **[SCREENSHOT PLACEHOLDER: ELA RESULT]**

### 4.5 Database Implementation
The system uses PostgreSQL for persistent storage of users and their scan history.

**SQLAlchemy Models (`backend/models/user.py`):**
```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    scans = relationship("ScanResult", back_populates="owner")

class ScanResult(Base):
    __tablename__ = "scan_results"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    label = Column(String)
    score = Column(Float)
```

> **[SCREENSHOT PLACEHOLDER: DASHBOARD/HISTORY PAGE]**

### 4.6 Frontend Implementation
The frontend is built with React and Vite, featuring a "Jujutsu Tech" themed UI with Framer Motion animations.

**React Upload Logic (`frontend/src/App.tsx`):**
```tsx
const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('http://localhost:8000/upload-image', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    setResult(response.data);
};
```

### 4.7 Docker Deployment
The application is containerized using Docker and Docker Compose for easy deployment.

**Docker Configuration (`docker-compose.yml`):**
```yaml
services:
  db:
    image: postgres:15-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/deepfake_db
  frontend:
    build: ./frontend
```

> **[SCREENSHOT PLACEHOLDER: DOCKER RUNNING]**

---

## CHAPTER 5: RESULTS AND TESTING

### 5.1 Real Image Detection
> **[SCREENSHOT PLACEHOLDER: REAL IMAGE DETECTION RESULT]**

### 5.2 Fake Image Detection
> **[SCREENSHOT PLACEHOLDER: FAKE IMAGE DETECTION RESULT]**

### 5.3 Performance Summary
> **[SCREENSHOT PLACEHOLDER: PERFORMANCE/TESTING OUTPUTS]**

---

## APPENDIX

### Appendix A – Source Code Snippets (Backend)
- `backend/main.py`: Main FastAPI entry point and route registration.
- `backend/routes/detection.py`: Complete image/video upload handlers.
- `backend/utils/detection.py`: Full ELA and Hugging Face integration logic.
- `backend/models/user.py`: Database schema definitions.

### Appendix B – Frontend Source Code
- `frontend/src/App.tsx`: Main application component including state management, UI layout, and API calls.
- `frontend/src/App.css`: Custom styling and animations.

### Appendix C – Configuration Files
- `backend/requirements.txt`: Python dependencies.
- `frontend/package.json`: React dependencies and scripts.
- `.env.example`: Template for environment variables.
- `backend/Dockerfile`: Container build instructions.
