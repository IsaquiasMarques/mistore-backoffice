import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBrand } from "@core/base-models/base/brands.model";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { IProduct, IProductResponse, IProductSize } from "@store/models/product.model";
import { map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreApi extends APIExtender {

    storeId: string = '1c13d9e3-41a3-47c5-83ae-8785441c878b';

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

    addProduct(product: JSON){
        console.log(product)
        this.http.post(`${ environment.backend }/api/products/Product-Insert`, product, { headers: this.headers }).pipe(tap(console.log)).subscribe();
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
        return this.http.get<IBrand[]>(`${ environment.backend }/api/brands/all`, { headers: this.headers })
                        .pipe(
                            map((incoming: any[]) => Transformer.brands(incoming)),
                        );
    }

    getLooks(page: number, limit_per_page: number): Observable<ILookResponse>{
        const shop_id: string = '9c84acac-6c0b-4d6a-82b7-0a9184d33cee';
        return this.http.get<ILook[]>(`${ environment.backend }/api/LookApi/GetLookByUser?shop_id=${ this.storeId }&page=${ page }&sortColumn=title&order=asc`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingLooks: any) => ({
                total: incomingLooks.look_count,
                looks: Transformer.looks(incomingLooks.looks)
            }))
        )
    }

    createLook(look: JSON): Observable<any>{
        return this.http.post(`${ environment.backend }/api/LookApi/InsertLook`, look, { headers: this.headers });
    }

    getCategories(): Observable<IProductCategory[]>{
        return this.http.get<IProductCategory[]>(`${ environment.backend }/api/categories/all`, { headers: this.headers })
                        .pipe(
                            map((incoming: any[]) => Transformer.categories(incoming))
                        );
    }

    getSizes(subcategory_id?: string): Observable<IProductSize[]>{
        const headers = new HttpHeaders().set('apiKey', environment.supabase_key);
        return this.http.get<IProductSize[]>(`${ environment.supabase_url }/rest/v1/Sizes`, { headers: headers }).pipe(
            map((incoming: any[]) => Transformer.sizes(incoming)),
            map(incoming => (subcategory_id) ? incoming.filter(size => size.subcategory_id === subcategory_id) : incoming)
        );
    }

    getColors(): Observable<ColorOption[]>{
        const headers = new HttpHeaders().set('apiKey', environment.supabase_key);
        return this.http.get<ColorOption[]>(`${ environment.supabase_url }/rest/v1/Colors`, { headers: headers }).pipe(
            map((incoming: any[]) => Transformer.colors(incoming))
        );
    }
}