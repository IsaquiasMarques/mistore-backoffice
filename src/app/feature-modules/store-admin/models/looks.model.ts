import { IProduct } from "./product.model";

export interface ILook{
    id: string,
    name: string,
    slug: string,
    description: string,
    images: string[],
    products: IProduct[],
}