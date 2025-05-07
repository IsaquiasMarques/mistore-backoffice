import { Injectable, inject } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { IProduct, IProductResponse } from "../../models/product.model";
import { IBrand } from "@core/base-models/base/brands.model";
import { StoreApi } from "@store/api/store.api.service";
import { ProductsData } from "@core/data/store/products.data";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade{

    private api = inject(StoreApi);
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
                this.productsData.clearData()
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

    deleteProduct(product: IProduct): Observable<any>{
        return this.api.deleteProduct(product).pipe(
            tap(() => {
                this.productsData.clearData()
            })
        );
    }

}