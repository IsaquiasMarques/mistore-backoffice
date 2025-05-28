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

    editProduct(product: any): Observable<any>{
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

        const productColorMethodDatas = {
            productId: product.id,
            colorId: product.colors[0],
            base64Image: product.images[0],
            filename: product.image_filename[0]
        };

        const productImageMethodDatas = {
            imageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            productId: product.id,
            newFileName: "string",
            type: 0,
            originalFileName: "string",
            newImageData: "string"
        }

        const productDiscountMethodDatas = {
            id: product.id,
            active: product.stock_status[0],
            discountRate: product.discount_rate,
            products: product.id
        }

        const productStockMethodDatas = {
            quantity: product.stock_quantity[0],
            product_id: product.id,
            size_id: product.sizes[0],
            color_id: product.colors[0],
            active: product.stock_status[0]
        }

        console.log(editProductMethodDatas)

        return this.api.editProduct(editProductMethodDatas)
        .pipe(
            switchMap(response => this.api.productColor(productColorMethodDatas)),
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