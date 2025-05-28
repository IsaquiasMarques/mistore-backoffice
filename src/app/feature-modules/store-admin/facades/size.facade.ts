import { inject, Injectable } from "@angular/core";
import { GenericApiService } from "@store/api/generic.api.service";
import { IProductSize } from "@store/models/product.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SizeFacade{
    private api = inject(GenericApiService);

    all(): Observable<IProductSize[]>{
        return this.api.getSizes();
    }

    sizesOfSubcategory(subcategory_id: string): Observable<IProductSize[]>{
        return this.api.getSizes(subcategory_id);
    }
}