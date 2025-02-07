import { inject, Injectable } from "@angular/core";
import { LooksData } from "@core/data/store/looks.data";
import { StoreApi } from "@store/api/store.api.service";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { DraftingLookFacade } from "./drafts.facade";

@Injectable({
    providedIn: 'root'
})
export class LookFacade{
    private api = inject(StoreApi);
    private looksData = inject(LooksData);
    private draftingLook = inject(DraftingLookFacade);

    looks(page: number, limit_per_page: number): Observable<ILookResponse>{

        const cached$ = this.looksData.dataOfPage(page);
        if(cached$().looks && cached$().looks.length > 0){
            return of(cached$());
        }

        return this.api.getLooks(page, limit_per_page).pipe(
            tap(incoming => {
                this.looksData.paginatedData(page, incoming.total, incoming.looks);
            })
        );
    }

    look(id: string): Observable<ILook[]>{
        return this.api.getLookById(id);
    }

    createDraft(look: any): Observable<any>{
        return this.draftingLook.createLook(look).pipe(
            catchError(error => throwError(() => error))
        );
    }

    looksOnDraft(page: number, limit: number): Observable<ILookResponse>{
        return this.draftingLook.paginatedDraftLooks(page, limit);
    }

    create(look: any): Observable<any>{
        return this.api.createLook(look);
    }

}