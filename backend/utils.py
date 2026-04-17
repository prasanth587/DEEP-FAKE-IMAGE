import io
import numpy as np
from PIL import Image, ImageChops, ImageEnhance
from transformers import pipeline
import torch

# Initialize the AI detector model
# Using umm-maybe/AI-image-detector which is relatively small and effective
try:
    pipe = pipeline("image-classification", model="umm-maybe/AI-image-detector")
except Exception as e:
    print(f"Error loading AI model: {e}")
    pipe = None

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

def detect_ai(image_bytes):
    """
    Uses a pre-trained model to detect if an image is AI-generated.
    """
    if pipe is None:
        return {"error": "AI model not loaded"}
    
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        results = pipe(image)
        print(f"DEBUG - Raw AI Detection Results: {results}")
        
        # Ensure we return a consistent format
        # If the model uses 'LABEL_0'/'LABEL_1', we need to check the config
        return results
    except Exception as e:
        print(f"DEBUG - AI Detection Error: {e}")
        return {"error": str(e)}
