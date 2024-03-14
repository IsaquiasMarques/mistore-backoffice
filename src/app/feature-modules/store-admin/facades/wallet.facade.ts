import { Injectable, inject } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { Observable } from "rxjs";
import { IProduct } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class WalletFacade{

    private api = inject(ApiService);

    walletProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getWalletProducts(page, limit);
    }

}