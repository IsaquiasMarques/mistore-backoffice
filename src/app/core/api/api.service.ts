import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBrand } from "@core/base-models/base/brands.model";
import { IProductCategory } from "@core/base-models/base/category.model";
import { IProductSubCategory } from "@core/base-models/base/subcategory.model";
import { Paginator } from "@core/classes/pagination/paginator.class";
import { ILook } from "@store/models/looks.model";
import { IProduct } from "@store/models/product.model";
import { Observable, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    constructor(private http: HttpClient) {}

    getWalletProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(incomingProducts, page, limit_per_page);
            })
        );
    }
    getProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(incomingProducts, page, limit_per_page);
            })
        );
    }

    getPromotionProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((filteredProducts: IProduct[]) => {
                return filteredProducts.filter(product => product.promotion_price > 0) ?? []
            }),
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(incomingProducts, page, limit_per_page);
            }),
        );
    }

    getFavoritesProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`api/products`).pipe(
            map((filteredProducts: IProduct[]) => {
                return filteredProducts.filter(product => product.favoritesCount && product.favoritesCount > 0) ?? []
            }),
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(incomingProducts, page, limit_per_page);
            }),
        );
    }
    
    getBrands(): Observable<IBrand[]>{
        return this.http.get<IBrand[]>(`api/brands`)
                        .pipe(
                            // tap(console.log)
                        );
    }

    getLooks(page: number, limit_per_page: number): Observable<ILook[]>{
        return this.http.get<ILook[]>(`api/looks`)
                        .pipe(
                            // tap(console.log),
                            map((incomingLooks: ILook[]) => {
                                return Paginator.paginate(incomingLooks, page, limit_per_page);
                            })
                        )
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