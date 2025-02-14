import { LookStatus } from "@store/enums/look-status.enum";
import { IProduct } from "./product.model";

export interface ILookResponse{
    total: number,
    looks: ILook[]
}

export interface ILook{
    id: string,
    name: string,
    slug: string,
    description: string,
    images: string[],
    filenames?: string[],
    products: IProduct[],
    status?: LookStatus
}