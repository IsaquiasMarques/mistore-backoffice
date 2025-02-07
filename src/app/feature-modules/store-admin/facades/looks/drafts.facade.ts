import { Injectable } from "@angular/core";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DraftingLookFacade{

    private localStorageDraftKey = 'store-account-mi-looks-on-draft';

    createLook(look: any): Observable<any>{
        const drafts: any[] = JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
        if(drafts.some(existentLook => existentLook.title === look.title)){
            return throwError(() => new Error('Este nome já está em uso, tente um outro'));
        }

        drafts.push(look);
        localStorage.setItem(this.localStorageDraftKey, JSON.stringify(drafts));
        return of({ code: 200, message: 'Look criado êxito, continue a editar para publicar' })
    }

    get looksOnDraft(): any[] {
        return JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
    }

    paginatedDraftLooks(page: number, limit: number): Observable<ILookResponse> {
        const drafts: any[] = JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
    
        if (drafts.length === 0) {
            return of({ looks: [], total: 0 });
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
    
        const paginatedLooks = drafts.slice(startIndex, endIndex);
    
        return of({
            looks: Transformer.draftLooks(paginatedLooks),
            total: drafts.length
        });
    }

}