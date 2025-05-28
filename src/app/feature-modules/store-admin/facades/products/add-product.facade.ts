import { inject, Injectable } from "@angular/core";
import { ProductsData } from "@core/data/store/products.data";
import { ProductApiService } from "@store/api/products.api.service";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AddProductFacade{
    private API = inject(ProductApiService);
    private productsData = inject(ProductsData);

    addProduct(product: JSON): Observable<any>{
        return this.API.addProduct(product).pipe(
            tap(() => this.productsData.clearData())
        );
    }
}