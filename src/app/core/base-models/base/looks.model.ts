import { ProductCard } from "./ProductCard.model";

export interface Look{
    id: number | string,
    title: string,
    description: string,
    slug: string,
    imagePath: string,
    viewsCount?: string,
    products: ProductCard[]
}