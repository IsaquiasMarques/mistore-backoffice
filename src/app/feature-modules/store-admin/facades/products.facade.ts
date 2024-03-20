import { Injectable, inject } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { Observable } from "rxjs";
import { IProduct } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade{

    private api = inject(ApiService);

    products(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getProducts(page, limit);
    }

    promotionProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getPromotionProducts(page, limit);
    }

    favoritesProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getFavoritesProducts(page, limit);
    }

}