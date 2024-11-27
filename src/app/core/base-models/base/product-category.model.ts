import { IProductSubCategory } from "./subcategory.model";

export interface IProductCategory{
    id: string,
    name: string,
    slug?: string,
    subcategories?: IProductSubCategory[]
}