import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../models/product.model";
import { ProductApiService } from "@store/api/products.api.service";

@Injectable({
    providedIn: 'root'
})
export class WalletFacade{

    private api = inject(ProductApiService);

    walletProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getWalletProducts(page, limit);
    }

}