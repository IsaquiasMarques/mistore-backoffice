import { IProductCategory } from "@core/base-models/base/product-category.model"
import { ProductStatusEnum } from "../enums/products-status.enum"

export interface IProductResponse{
    total: number,
    products: IProduct[]
}

export interface IProductColor{
    id: string,
    color: string,
    hexCode: string,
    imageColor?: string,
    filenameImage?: string
}

export interface IProductSize{
    id: string,
    subcategory_id?: string,
    size: string
}

export interface IProductSubCategory{
    id: string,
    name: string,
    parent_id?: string
    slug?: string
}

export interface IProductBrand{
    id: string,
    name: string,
    slug: string,
    logo: string,
    background: string
}

export interface FilenameImage{
    id: string,
    image: string,
    filename: string
}

export interface ProductBrand{
    id: string,
    name: string,
    slug: string,
    logo: string,
    bgImage?: string
}

export interface IProduct{
    id: string,
    ID: string,
    imagePath: string,
    brand: ProductBrand,
    featureImages?: FilenameImage[],
    coverImage?: string,
    coverImageFilename?: string,
    name: string,
    description?: string,
    categories: IProductCategory[],
    subcategory: IProductSubCategory,
    quantity: number,
    // status?: ProductStatusEnum,
    status?: any[],
    favoritesCount?: number,
    created_at: string,
    price: number,
    promotion_price: number,
    money_raised: number,
    colors?: IProductColor[]
    sizes?: IProductSize[]
}