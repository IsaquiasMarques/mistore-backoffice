import { IProductCategory } from "@core/base-models/base/product-category.model"
import { ProductStatusEnum } from "../enums/products-status.enum"

export interface IProductResponse{
    total: number,
    products: IProduct[]
}

export interface IProductColor{
    id: string,
    color: string,
    hexCode: string
}

export interface IProductSize{
    id: string,
    size: string
}

export interface IProductSubCategory{
    id: string,
    name: string,
    parent_id: string
    slug?: string
}

export interface IProductBrand{
    id: string,
    name: string,
    slug: string,
    logo: string,
    background: string
}

export interface IProduct{
    id: string,
    ID: string,
    imagePath: string,
    featureImages?: string[],
    coverImage?: string,
    name: string,
    description?: string,
    subcategory: IProductSubCategory,
    quantity: number,
    status?: ProductStatusEnum,
    favoritesCount?: number,
    created_at: string,
    price: number,
    promotion_price: number,
    money_raised: number,
    colors?: IProductColor[]
    sizes?: IProductSize[]
}