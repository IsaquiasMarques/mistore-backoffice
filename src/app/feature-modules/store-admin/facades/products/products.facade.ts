import { Injectable, inject } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { Observable } from "rxjs";
import { IProduct, IProductResponse } from "../../models/product.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { IProductSubCategory } from "@core/base-models/base/subcategory.model";
import { IBrand } from "@core/base-models/base/brands.model";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade{

    private api = inject(ApiService);

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