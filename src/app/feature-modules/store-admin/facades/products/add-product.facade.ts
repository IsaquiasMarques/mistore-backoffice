import { inject, Injectable } from "@angular/core";
import { StoreApi } from "@store/api/store.api.service";

@Injectable({
    providedIn: 'root'
})
export class AddProductFacade{
    private API = inject(StoreApi);

    addProduct(product: JSON): void{
        this.API.addProduct(product);
    }
}