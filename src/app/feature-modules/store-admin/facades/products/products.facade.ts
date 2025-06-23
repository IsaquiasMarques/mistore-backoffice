import { Injectable, inject } from "@angular/core";
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { IProduct, IProductResponse } from "../../models/product.model";
import { IBrand } from "@core/base-models/base/brands.model";
import { ProductsData } from "@core/data/store/products.data";
import { ProductApiService } from "@store/api/products.api.service";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade{

    private api = inject(ProductApiService);
    private productsData = inject(ProductsData);

    products(page: number, limit: number): Observable<IProductResponse>{
        const cached$ = this.productsData.dataOfPage(page);
        if(cached$().products && cached$().products.length > 0){
            return of(cached$());
        }

        return this.api.getProducts(page, limit).pipe(
            tap((response: IProductResponse) => {
                this.productsData.paginatedData(page, response.total, response.products);
            })
        );
    }

    getProductById(id: string): Observable<any>{
        return this.api.getProductById(id).pipe(
            tap(() => {
                // this.productsData.clearData()
            })
        );
    }

    promotionProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getPromotionProducts(page, limit);
    }

    favoritesProducts(page: number, limit: number): Observable<IProductResponse>{
        return this.api.getFavoritesProducts(page, limit);
    }

    brands(): Observable<IBrand[]>{
        return this.api.getBrands();
    };

    editProduct(product: any, page: number): Observable<any>{
        // return this.api.editProduct(product);

        const editProductMethodDatas = {
            userid: product.shop_id,
            product_id: product.productId,
            name: product.name,
            price: product.price,
            desc: product.desc,
            brand_id: product.brand_id,
            subcategory_id: product.subcategory_id,
            coverimage: product.coverimage,
            coverimage_filename: product.coverimage_filename,
            coverimage_filenameold: product.coverimage_filenameold
        }

        const productImageMethodDatas = {
            imageId: product.oldImages[0].id,
            productId: product.productId,
            newFileName: product.image_filename[0],
            type: 0,
            originalFileName: product.oldImages[0].filename,
            newImageData: product.images[0]
        }

        const productDiscountMethodDatas = {
            id: product.productId,
            active: product.stock_status[0],
            discountRate: product.discount_rate,
            products: product.productId
        }

        const productStockMethodDatas = {
            quantity: product.stock_quantity[0],
            product_id: product.productId,
            size_id: product.sizes[0],
            color_id: product.new_colors[0],
            active: product.stock_status[0]
        }

        console.log(editProductMethodDatas, productStockMethodDatas, productDiscountMethodDatas, productImageMethodDatas)

        return this.api.editProduct(editProductMethodDatas)
        .pipe(
            tap(console.log),
            map((response: any) => {
               this.productsData.removeDataFromPage(page, product);
               return response;
            }),
            switchMap(response => {
                let colorSubs: Observable<any>[] = [];
                product.new_colors.forEach((color: string, index: number) => {
                    const theColor = {
                        productId: product.productId,
                        colorId: color,
                        base64Image: product.imagescolor[index],
                        filename: product.imagescolor_filename[index]
                    }
                    console.log(product, theColor);
                    colorSubs.push(
                        this.api.productColor(
                            theColor
                        )
                    )
                });
                return forkJoin(colorSubs);
            }),
            switchMap(response => {
                let imagesSubs: Observable<any>[] = [];
                // logic for single colors and sizes, going to do further
                if(product.images.length > 0)
                    return this.api.productImage(productImageMethodDatas);

                return of(response);
            }),
            tap(console.log),
            switchMap(response => this.api.productDiscount(productDiscountMethodDatas)),
            switchMap(response => this.api.productStock(productStockMethodDatas)),
            catchError(error => throwError(() => error))
        )
    }

    deleteProduct(product_page: number, product: IProduct): Observable<any>{
        return this.api.deleteProduct(product).pipe(
            map((response: any) => {
                return {
                    remaining: this.productsData.removeDataFromPage(product_page, product),
                    response
                };
            })
        );
    }

}