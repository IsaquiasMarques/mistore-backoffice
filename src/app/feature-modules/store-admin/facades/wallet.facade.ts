import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../models/product.model";
import { StoreApi } from "@store/api/store.api.service";

@Injectable({
    providedIn: 'root'
})
export class WalletFacade{

    private api = inject(StoreApi);

    walletProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getWalletProducts(page, limit);
    }

}