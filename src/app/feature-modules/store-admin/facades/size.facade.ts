import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { IProductSize } from "@store/models/product.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SizeFacade{
    private API = inject(ApiService);

    all(): Observable<IProductSize[]>{
        return this.API.getSizes();
    }

    sizesOfSubcategory(subcategory_id: string): Observable<IProductSize[]>{
        return this.API.getSizes(subcategory_id);
    }
}