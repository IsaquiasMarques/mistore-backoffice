import { inject, Injectable } from "@angular/core";
import { StoreApi } from "@store/api/store.api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AddProductFacade{
    private API = inject(StoreApi);

    addProduct(product: JSON): Observable<any>{
        return this.API.addProduct(product);
    }
}