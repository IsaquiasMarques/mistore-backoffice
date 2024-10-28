import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { AddProductModel } from "@store/components/views/products/create/create-product.component";

@Injectable({
    providedIn: 'root'
})
export class AddProductFacade{
    private API = inject(ApiService);
    constructor() { }

    addProduct(product: AddProductModel): void{
        // 
    }
}