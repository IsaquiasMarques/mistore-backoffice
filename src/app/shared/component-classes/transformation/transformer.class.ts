import { IBrand } from "@core/base-models/base/brands.model";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { ProductStatusEnum } from "@store/enums/products-status.enum";
import { ILook } from "@store/models/looks.model";
import { IProduct, IProductColor, IProductSize } from "@store/models/product.model";

export class Transformer{

    static products(incoming: any[]): IProduct[]{
        
        return incoming.flatMap((product) => {

            const created_at = this.date((product.dateTime).split('T')[0], '-', '/');
            const featureImages: string[] = product.featureimages.flatMap((image: any) => {
                return image.image
            });
            const productColors: IProductColor[] = product.product_ColorId.flatMap((color: any) => {
                return {
                    id: color.color_id,
                    color: color.color_name,
                    hexCode: color.hexacode
                }
            });

            // const productSizes: IProductSize[] = (product.product_Size);
            
            return {
                id: product.id,
                ID: product.id_product_reference ?? '',
                imagePath: product.image_path,
                featureImages: featureImages,
                coverImage: product.coverimage,
                name: product.name,
                description: product.description,
                subcategory: {
                    id: (product.subcategories[0]) ? product.subcategories[0].id : '',
                    name: (product.subcategories[0]) ? product.subcategories[0].name : 'Não categorizado',
                    slug: (product.subcategories[0]) ? product.subcategories[0].slug : 'nao-categorizado',
                    parent_id: (product.subcategories[0]) ? product.subcategories[0].category_id : ''
                },
                quantity: (product.status[0]) ? product.status[0].quantity : 0,
                status: (product.status[0] && product.status[0].status) ? ProductStatusEnum.AVAILABLE : ProductStatusEnum.UNAVAILABLE,
                favoritesCount: product.favourite_count,
                created_at: created_at,
                price: product.price,
                promotion_price: 0,
                money_raised: product.money_raised,
                colors: productColors,
                sizes: []
            }
        });
    }

    static looks(incoming: any[]): ILook[]{
        return [];
    }

    static brands(incoming: any[]): IBrand[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                name: i.name,
                slug: i.slug,
                logoPath: i.logo,
                bgPath: i.bgImage
            }
        });
    }

    static categories(incoming: any[]): IProductCategory[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                name: i.name,
                slug: i.slug,
                subcategories: i.subcategories.flatMap((s: any) => {
                    return {
                        id: s.id,
                        name: s.name,
                        slug: s.slug,
                        // parent_id: s.category_id
                        parent_id: i.id
                    }
                })
            }
        });
    }

    static sizes(incoming: any[]): IProductSize[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                size: i.size,
                subcategory_id: i.subcategory_id
            }
        });
    }

    static colors(incoming: any[]): ColorOption[]{
        return incoming.flatMap((i: any) => {
            return {
                id: i.id,
                hexCode: i.color,
                colorName: i.description,
                selected: false
            }
        })
    }

    static date(date: string, currentSeparator: string, replacementSeparator: string): string{
        const year = date.split(currentSeparator)[0];
        const month = date.split(currentSeparator)[1];
        const day = date.split(currentSeparator)[2];

        return `${ day + replacementSeparator + month + replacementSeparator + year }`;
    }

}