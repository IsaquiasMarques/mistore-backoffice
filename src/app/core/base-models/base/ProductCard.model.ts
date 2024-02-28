import { ColorOption } from "./ColorOption.model";

export interface ShopInterface{
  id: string,
  name: string,
  description?: string,
  nif?: string,
  location?: string,
  email?: string,
  phone?: string,
  image?: string,
}

export interface ProductCard {
  id?: string,
  name?: string,
  slug?: string,
  brand?: string,
  thumbnailPath: string;
  featureImages?: string[];
  coverImage?: string,
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  old_price?: number,
  shop?: ShopInterface,
  currency: string;
  availableColors?: ColorOption[];
  productSizes?: string[],
  selectedColorIndex?: number;
  inFavorites: boolean;
}