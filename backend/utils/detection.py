# Machine Learning powered detection core using Python 3
# This module integrates Deep Learning models with digital forensics
import cv2
import numpy as np
import io
import base64
import os
import requests
from PIL import Image, ImageChops, ImageEnhance
from dotenv import load_dotenv

# Load environment variables for AI Model authentication
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# Specialized Deepfake Detection Model (using new HF Inference Router)
API_URL = "https://router.huggingface.co/hf-inference/models/prithivMLmods/deepfake-detector-model-v1"
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def map_ai_labels(results):
    """
    Maps model labels to our standards (Real vs Fake).
    """
    if not isinstance(results, list):
        return results
        
    mapped_results = []
    for item in results:
        label = str(item.get("label", "")).lower()
        score = item.get("score", 0)
        
        # Deepfake detection models usually return labels like 'real' and 'fake'
        # We map them to 'artificial' and 'human' to match the frontend expectations
        if "fake" in label or "synthetic" in label or "generated" in label:
            mapped_label = "artificial"
        elif "real" in label or "natural" in label or "human" in label:
            mapped_label = "human"
        else:
            mapped_label = label
            
        mapped_results.append({"label": mapped_label, "score": score})
        
    return sorted(mapped_results, key=lambda x: x['score'], reverse=True)

def get_ela(image_bytes, quality=90):
    """
    Performs Error Level Analysis (ELA) on an image.
    """
    original = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # Save the image at a specific quality
    buffered = io.BytesIO()
    original.save(buffered, format="JPEG", quality=quality)
    resaved = Image.open(io.BytesIO(buffered.getvalue()))
    
    # Calculate the absolute difference
    ela_image = ImageChops.difference(original, resaved)
    
    # Get the maximum pixel value for normalization
    extrema = ela_image.getextrema()
    max_diff = max([ex[1] for ex in extrema])
    if max_diff == 0:
        max_diff = 1
        
    scale = 255.0 / max_diff
    
    # Enhance the difference
    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)
    
    # Convert to bytes for transmission
    output = io.BytesIO()
    ela_image.save(output, format="JPEG")
    return output.getvalue()

def process_image_cv2(image_bytes: bytes):
    """
    Hugging Face Inference API and Local ELA processing.
    """
    # 1. Hugging Face API Detection
    ai_results = None
    try:
        # Check for token existence
        if not HF_TOKEN or len(HF_TOKEN) < 10 or HF_TOKEN == "your_huggingface_token_here":
            print("ERROR: Hugging Face Token is missing or too short.")
            return {"error": "Hugging Face API Token is missing or invalid. Please check your .env file."}

        print(f"DEBUG: Calling HF API for image detection: {API_URL}")
        # Log first few characters of token for debugging (SAFE)
        print(f"DEBUG: Using token starting with: {HF_TOKEN[:8]}...")
        
        # Ensure Content-Type is set for the new inference router
        request_headers = {**headers, "Content-Type": "image/jpeg"}
        response = requests.post(API_URL, headers=request_headers, data=image_bytes, timeout=30)
        print(f"DEBUG: HF API Response Status: {response.status_code}")
        
        if response.status_code == 200:
            ai_results = response.json()
            print(f"DEBUG: HF API Results (Raw): {ai_results}")
            
            # Check if the API returned an error (like model loading)
            if isinstance(ai_results, dict) and "error" in ai_results:
                return {"error": f"HF API Error: {ai_results['error']}"}
            
            # Map labels for frontend compatibility
            ai_results = map_ai_labels(ai_results)
            print(f"DEBUG: Mapped Results: {ai_results}")

        elif response.status_code == 503:
            # Model is loading
            try:
                err_data = response.json()
                wait_time = err_data.get("estimated_time", 20)
                return {"error": f"Model is currently loading at Hugging Face. Estimated time: {wait_time}s. Please retry in a moment."}
            except:
                return {"error": "Model is currently loading at Hugging Face. Please try again in 30 seconds."}
        elif response.status_code == 401:
            return {"error": "Hugging Face Authentication failed. Please check your HF_TOKEN in the .env file."}
        elif response.status_code == 404:
            print(f"DEBUG: 404 Error Detail: {response.text[:500]}")
            return {"error": "The AI detection model is temporarily unavailable (404). We are looking for a replacement model."}
        else:
            print(f"DEBUG: HF API non-200 status: {response.text[:200]}")
            return {"error": f"AI detection failed (Status {response.status_code}). The Hugging Face service might be down or busy."}
            
    except requests.exceptions.Timeout:
        return {"error": "AI detection timed out. Please check your internet connection and try again."}
    except Exception as e:
        print(f"DEBUG: HF API Exception: {str(e)}")
        return {"error": f"An unexpected error occurred during AI detection: {str(e)}"}
    
    # Ensure we have valid results before proceeding
    if not ai_results or not isinstance(ai_results, list):
        return {"error": "Invalid response received from the AI detection service."}
    
    # 2. Local ELA Processing
    ela_bytes = get_ela(image_bytes)
    ela_base64 = base64.b64encode(ela_bytes).decode('utf-8')
    
    return {
        "ai_detection": ai_results,
        "ela_image": f"data:image/jpeg;base64,{ela_base64}"
    }
    
    # 2. Local ELA Processing
    ela_bytes = get_ela(image_bytes)
    ela_base64 = base64.b64encode(ela_bytes).decode('utf-8')
    
    return {
        "ai_detection": ai_results,
        "ela_image": f"data:image/jpeg;base64,{ela_base64}"
    }

def process_video_cv2(video_bytes: bytes):
    """
    Dummy video processing.
    """
    is_fake = np.random.choice([True, False])
    return {
        "result": "fake" if is_fake else "real",
        "message": "Video analysis is currently simulated."
    }
