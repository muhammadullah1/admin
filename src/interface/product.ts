export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  images: string[];  // Array of image URLs
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;       // Version number
}

export interface ProductPayload {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
}