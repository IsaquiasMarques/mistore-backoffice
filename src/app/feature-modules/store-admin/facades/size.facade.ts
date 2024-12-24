import { inject, Injectable } from "@angular/core";
import { StoreApi } from "@store/api/store.api.service";
import { IProductSize } from "@store/models/product.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SizeFacade{
    private API = inject(StoreApi);

    all(): Observable<IProductSize[]>{
        return this.API.getSizes();
    }

    sizesOfSubcategory(subcategory_id: string): Observable<IProductSize[]>{
        return this.API.getSizes(subcategory_id);
    }
}