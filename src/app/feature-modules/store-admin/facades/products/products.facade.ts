import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct, IProductResponse } from "../../models/product.model";
import { IBrand } from "@core/base-models/base/brands.model";
import { StoreApi } from "@store/api/store.api.service";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade{

    private api = inject(StoreApi);

    products(page: number, limit: number): Observable<IProductResponse>{
        return this.api.getProducts(page, limit);
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