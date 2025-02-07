import { Injectable, inject } from "@angular/core";
import { Observable, of, tap } from "rxjs";
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

    promotionProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getPromotionProducts(page, limit);
    }

    favoritesProducts(page: number, limit: number): Observable<IProductResponse>{
        return this.api.getFavoritesProducts(page, limit);
    }

    brands(): Observable<IBrand[]>{
        return this.api.getBrands();
    };

}