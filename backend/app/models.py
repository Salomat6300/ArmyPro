from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .database import Base  # Bu yerda Base import qilinadi

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    email = Column(String(100), unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    description = Column(String(500))
    price = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())