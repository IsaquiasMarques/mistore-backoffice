import { ProductStatusEnum } from "../enums/products-status.enum"

export interface IProduct{
    id: string,
    ID: number,
    imagePath: string,
    name: string,
    category: string,
    subcategory: string,
    quantity: number,
    status?: ProductStatusEnum,
    favoritesCount?: number,
    created_at: string,
    price: number,
    promotion_price: number,
    money_raised: number
}