import { inject, Injectable } from "@angular/core";
import { ProductsData } from "@core/data/store/products.data";
import { StoreApi } from "@store/api/store.api.service";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AddProductFacade{
    private API = inject(StoreApi);
    private productsData = inject(ProductsData);

    addProduct(product: JSON): Observable<any>{
        return this.API.addProduct(product).pipe(
            tap(() => this.productsData.clearData())
        );
    }
}