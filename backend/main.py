from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.db import engine, Base
from .routes import auth, detection, history
from .models import user

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Deepfake Detection Pro API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, tags=["Authentication"])
app.include_router(detection.router, tags=["Detection"])
app.include_router(history.router, tags=["History"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Deepfake Detection Pro API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
