from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from ..utils.auth import get_current_user
from ..utils.detection import process_image_cv2, process_video_cv2
from ..models.user import User, ScanResult
from ..database.db import get_db

router = APIRouter()

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    contents = await file.read()
    result = process_image_cv2(contents)
    
    if "ai_detection" in result:
        # Determine top label
        top_label = result['ai_detection'][0]['label']
        top_score = result['ai_detection'][0]['score']
        
        # Save to history
        db_result = ScanResult(
            user_id=current_user.id,
            filename=file.filename,
            label=top_label,
            score=top_score
        )
        db.add(db_result)
        db.commit()
    
    return {
        "filename": file.filename,
        "result": result,
        "processed_by": current_user.email
    }

@router.post("/upload-video")
async def upload_video(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user)
):
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    contents = await file.read()
    result = process_video_cv2(contents)
    
    return {
        "filename": file.filename,
        "result": result,
        "processed_by": current_user.email
    }
