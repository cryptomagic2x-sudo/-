from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import shutil
import base64


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# ==================== DRAWER CARDS MODELS ====================

class DrawerCard(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    link: str
    image_url: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DrawerCardCreate(BaseModel):
    title: str
    link: str
    image_url: str
    order: int = 0

class DrawerCardUpdate(BaseModel):
    title: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None


# ==================== DRAWER CARDS API ====================

@api_router.get("/drawer-cards", response_model=List[DrawerCard])
async def get_drawer_cards():
    """Get all drawer cards sorted by order"""
    cards = await db.drawer_cards.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    for card in cards:
        if isinstance(card.get('created_at'), str):
            card['created_at'] = datetime.fromisoformat(card['created_at'])
        if isinstance(card.get('updated_at'), str):
            card['updated_at'] = datetime.fromisoformat(card['updated_at'])
    return cards

@api_router.get("/drawer-cards/{card_id}", response_model=DrawerCard)
async def get_drawer_card(card_id: str):
    """Get a single drawer card by ID"""
    card = await db.drawer_cards.find_one({"id": card_id}, {"_id": 0})
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@api_router.post("/drawer-cards", response_model=DrawerCard)
async def create_drawer_card(card_data: DrawerCardCreate):
    """Create a new drawer card"""
    card = DrawerCard(**card_data.model_dump())
    doc = card.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.drawer_cards.insert_one(doc)
    return card

@api_router.put("/drawer-cards/{card_id}", response_model=DrawerCard)
async def update_drawer_card(card_id: str, card_data: DrawerCardUpdate):
    """Update an existing drawer card"""
    existing = await db.drawer_cards.find_one({"id": card_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Card not found")
    
    update_data = {k: v for k, v in card_data.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.drawer_cards.update_one({"id": card_id}, {"$set": update_data})
    updated = await db.drawer_cards.find_one({"id": card_id}, {"_id": 0})
    return updated

@api_router.delete("/drawer-cards/{card_id}")
async def delete_drawer_card(card_id: str):
    """Delete a drawer card"""
    result = await db.drawer_cards.delete_one({"id": card_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"message": "Card deleted successfully"}

@api_router.post("/drawer-cards/reorder")
async def reorder_drawer_cards(card_orders: List[dict]):
    """Reorder drawer cards. Expects list of {id: str, order: int}"""
    for item in card_orders:
        await db.drawer_cards.update_one(
            {"id": item["id"]}, 
            {"$set": {"order": item["order"], "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
    return {"message": "Cards reordered successfully"}


# ==================== IMAGE UPLOAD API ====================

@api_router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """
    Upload an image for drawer cards.
    
    Recommended format: PNG or WebP
    Recommended size: 1200x800px (3:2 ratio)
    Max file size: 5MB
    """
    # Validate file type
    allowed_types = ["image/png", "image/jpeg", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: PNG, JPEG, WebP. Recommended: PNG or WebP at 1200x800px"
        )
    
    # Generate unique filename
    file_ext = file.filename.split(".")[-1] if "." in file.filename else "png"
    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = UPLOADS_DIR / filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL
    return {
        "filename": filename,
        "url": f"/uploads/{filename}",
        "message": "Image uploaded successfully",
        "recommendation": "Best format: PNG or WebP, Size: 1200x800px (3:2 ratio)"
    }


# ==================== EXISTING ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()