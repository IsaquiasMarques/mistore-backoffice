import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "@app/feature-modules/store-admin/models/product.model";
import { Observable, delay, map, of } from "rxjs";
import { PRODUCTS } from "../mocks/products.mock";

@Injectable({
    providedIn: 'root'
})
export class ApiService{

    constructor(private http: HttpClient) { }    

    getWalletProducts(limit?: number, offset: number = 0): Observable<IProduct[]>{
        return of(PRODUCTS).pipe(delay(4000));
    }
}