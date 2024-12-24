import { inject, Injectable } from "@angular/core";
import { StoreApi } from "@store/api/store.api.service";
import { ILookResponse } from "@store/models/looks.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LookFacade{
    private api = inject(StoreApi);

    looks(page: number, limit_per_page: number): Observable<ILookResponse>{
        return this.api.getLooks(page, limit_per_page);
    }

    create(look: any): Observable<any>{
        return this.api.createLook(look);
    }
}