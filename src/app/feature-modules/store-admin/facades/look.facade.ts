import { inject, Injectable } from "@angular/core";
import { StoreApi } from "@store/api/store.api.service";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LookFacade{
    private api = inject(StoreApi);

    looks(page: number, limit_per_page: number): Observable<ILookResponse>{
        return this.api.getLooks(page, limit_per_page);
    }

    look(id: string): Observable<ILook[]>{
        return this.api.getLookById(id);
    }

    create(look: any): Observable<any>{
        return this.api.createLook(look);
    }

}