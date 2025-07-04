import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment.development";
import { Paginator } from "@shared/component-classes/pagination/paginator.class";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { IProduct, IProductResponse } from "@store/models/product.model";
import { map, Observable } from "rxjs";
import { StoreApi } from "./store.api.service";

@Injectable({
    providedIn: 'root'
})
export class ProductApiService extends StoreApi{
    
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

    getProducts(page: number = 1, limit_per_page: number): Observable<IProductResponse>{
        return this.http.get<IProductResponse>(`${ environment.backend }/api/products/getallproductsbyshop?id=${ this.storeId }&page=${ page }&page_size=${ limit_per_page }&sortColumn=create_date&order=desc`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingProducts: any) => {
                return {
                    total: incomingProducts.totalProductCount,
                    products: Transformer.products(incomingProducts.products)
                };
            })
        );
    }

    getProductById(id: string): Observable<any>{
        return this.http.get<IProduct[]>(`${ environment.backend }/api/products/GetProductById?id=${id}`,
            { headers: this.headers }
        ).pipe(
            map((products) => Transformer.products([products])[0])
        )
    }

    addProduct(product: JSON): Observable<any>{
        return this.http.post(`${ environment.backend }/api/products/Product-Insert`, product, { headers: this.headers });
    }

    editProduct(product: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.patch<any>(`${ environment.backend }/api/products/Updateproduct`, product, { headers: localHeaders });
    }

    productColor(data: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.post<any>(`${ environment.backend }/api/ProductColor`, data, { headers: localHeaders });
    }

    productImage(data: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.put<any>(`${ environment.backend }/api/ProductImage/update`, data, { headers: localHeaders });
    }

    productDiscount(data: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.post<any>(`${ environment.backend }/api/Discount`, data, { headers: localHeaders });
    }

    productStock(data: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.post<any>(`${ environment.backend }/api/StockApi`, data, { headers: localHeaders });
    }

    deleteProduct(product: IProduct){
        const options = {}
        return this.http.delete<any>(`${ environment.backend }/api/products/RemoveProduct?filename_image=${ (product.featureImages && product.featureImages.length > 0) ? product.featureImages[0].filename : null }&filename_coverimage=${ product.coverImageFilename ?? null }&filename_image_color=${ (product.colors && product.colors.length > 0) ? product.colors[0].filenameImage : null }&product_id=${ product.id }&userid=${ this.storeId }`, {headers: this.headers});
    }

}