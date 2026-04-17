from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..utils.auth import get_current_user
from ..models.user import User, ScanResult
from ..database.db import get_db

router = APIRouter()

@router.get("/history")
async def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Fetches the scan history for the logged-in user.
    """
    # Fetch scans ordered by most recent first
    scans = db.query(ScanResult).filter(ScanResult.user_id == current_user.id).order_by(ScanResult.created_at.desc()).all()
    
    return [
        {
            "id": scan.id,
            "filename": scan.filename,
            "label": scan.label,
            "score": scan.score,
            "created_at": scan.created_at.isoformat()
        }
        for scan in scans
    ]
