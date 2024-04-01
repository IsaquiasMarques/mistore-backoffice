import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBrand } from "@core/base-models/base/brands.model";
import { IProductCategory } from "@core/base-models/base/category.model";
import { IProductSubCategory } from "@core/base-models/base/subcategory.model";
import { IProduct } from "@store/models/product.model";
import { Observable, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    constructor(private http: HttpClient) { }

    getWalletProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        const startIndex = (page - 1) * limit_per_page;
        const endIndex = startIndex + (limit_per_page - 1);

        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((incomingProducts: IProduct[]) => {
                return incomingProducts.slice(startIndex, endIndex + 1)
            })
        );
    }
    getProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        const startIndex = (page - 1) * limit_per_page;
        const endIndex = startIndex + (limit_per_page - 1);

        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((incomingProducts: IProduct[]) => {
                return incomingProducts.slice(startIndex, endIndex + 1)
            })
        );
    }

    getPromotionProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        const startIndex = (page - 1) * limit_per_page;
        const endIndex = startIndex + (limit_per_page - 1);

        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((filteredProducts: IProduct[]) => {
                return filteredProducts.filter(product => product.promotion_price > 0) ?? []
            }),
            map((incomingProducts: IProduct[]) => {
                return incomingProducts.slice(startIndex, endIndex + 1)
            }),
        );
    }

    getFavoritesProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        const startIndex = (page - 1) * limit_per_page;
        const endIndex = startIndex + (limit_per_page - 1);

        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((filteredProducts: IProduct[]) => {
                return filteredProducts.filter(product => product.favoritesCount && product.favoritesCount > 0) ?? []
            }),
            map((incomingProducts: IProduct[]) => {
                return incomingProducts.slice(startIndex, endIndex + 1)
            }),
        );
    }
    
    getBrands(): Observable<IBrand[]>{
        return this.http.get<IBrand[]>(`api/brands`)
                        .pipe(
                            // tap(console.log)
                        );
    }

    getCategories(): Observable<IProductCategory[]>{
        return this.http.get<IProductCategory[]>(`api/categories`)
                        .pipe(
                            // tap(console.log)
                        );
    }

    getSubcategories(categoryId: string): Observable<IProductSubCategory[]>{
        return this.http.get<IProductSubCategory[]>(`api/subcategories?category_id=${ categoryId }`)
                        .pipe(
                            // tap(console.log)
                        );
    }
}