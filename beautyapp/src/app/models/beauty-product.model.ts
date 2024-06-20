// src/app/models/beauty-product.model.ts
export interface BeautyProduct {
    id: number;
    name: string;
    price: number;
    favorite: boolean;
    rating: number;
    tags: string[];
    imageUrl: string;
  }
  