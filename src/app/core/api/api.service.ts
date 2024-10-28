import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBrand } from "@core/base-models/base/brands.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { IProductSubCategory } from "@core/base-models/base/subcategory.model";
import { APIExtender } from "@core/class/api/api-extender.class";
import { BRANDS } from "@core/mocks/brands.mock";
import { CATEGORIES } from "@core/mocks/categories.mock";
import { SUB_CATEGORIES } from "@core/mocks/subcategories.mock";
import { environment } from "@env/environment.development";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { WidgetPercentageStatusEnum } from "@shared/Enums/widget-percentage-status.enum";
import { ILook } from "@store/models/looks.model";
import { IProduct, IProductResponse } from "@store/models/product.model";
import { StatisticsData } from "@store/models/statistics.model";
import { Observable, delay, map, of, tap, timer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService extends APIExtender {

    constructor(private http: HttpClient) {
        super();
    }

    getWalletProducts(page: number = 1, limit_per_page: number): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.storeId }`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingProducts: IProduct[]) => {
                return Paginator.paginate(Transformer.products(incomingProducts), page, limit_per_page);
            })
        );
    }

    getProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.http.get<IProductResponse>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.storeId }&page=${ page }`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingProducts: any) => {
                return {
                    total: incomingProducts.totalProductCount,
                    // products: Paginator.paginate(Transformer.products(incomingProducts.products), page, limit_per_page)
                    products: Transformer.products(incomingProducts.products)
                };
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

    getFavoritesProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.http.get<IProductResponse>(`${ environment.backend }/api/products/GET-ListOfProductsClient?id=${ this.storeId }&page=${ page }`,
            { headers: this.headers }
        )
        .pipe(
            map((incoming: any) => {
                return {
                    total: incoming.totalProductCount,
                    products: Transformer.products(incoming.products)
                }
            }),
            map((filteredProducts: IProductResponse) => {
                return {
                    ...filteredProducts,
                    products: filteredProducts.products.filter(product => product.favoritesCount && product.favoritesCount > 0) ?? []
                }
            })
        );
    }
    
    getBrands(): Observable<IBrand[]>{
        // return this.http.get<IBrand[]>(`api/brands`)
        //                 .pipe(
        //                     delay(2000),
        //                     map(_ => BRANDS),
        //                 );
        return of(BRANDS).pipe(delay(2000));
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
        // return this.http.get<IProductCategory[]>(`api/categories`)
        //                 .pipe(
        //                     // tap(console.log)
        //                 );
        return of(CATEGORIES).pipe(delay(2000));
    }

    getSubcategories(categoryId: string): Observable<IProductSubCategory[]>{
        // return this.http.get<IProductSubCategory[]>(`api/subcategories?category_id=${ categoryId }`)
        //                 .pipe(
        //                     // tap(console.log)
        //                 );
        return of(SUB_CATEGORIES).pipe(
            delay(2000),
            map(_ => _.filter(subcategory => subcategory.category_id === categoryId))
        )
    }
}