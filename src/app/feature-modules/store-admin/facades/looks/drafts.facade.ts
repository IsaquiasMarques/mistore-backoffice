import { Injectable } from "@angular/core";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { IProduct } from "@store/models/product.model";
import { Observable, of, switchMap, throwError } from "rxjs";

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

    get looksOnDraft(): Observable<any[]> {
        return of(JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]'));
    }

    private lookOnDraftUnTransformed(id: string):Observable<any>{
        const items: any[] = JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
        return of(items.filter(item => item.id === id));
    }
    
    lookOnDraft(id: string):Observable<any>{
        const items: any[] = JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
        return of(Transformer.draftLooks(items.filter(item => item.id === id)));
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

    updateLookProducts(look_id: string, products: IProduct[]): Observable<any>{
        return this.lookOnDraftUnTransformed(look_id).pipe(
            switchMap(look => {
                if (!look) {
                    return throwError(() => new Error('Look não encontrado.'));
                }
    
                // Atualizar os produtos do look
                look.product_id = products;
    
                // Atualizar no localStorage
                const drafts: any[] = JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
                const updatedDrafts = drafts.map(existingLook =>
                    existingLook.id === look_id ? { ...existingLook, product_id: products } : existingLook
                );
    
                localStorage.setItem(this.localStorageDraftKey, JSON.stringify(updatedDrafts));
    
                return of({ success: true, message: 'Produtos do look em draft atualizados com sucesso.' });
            })
        );
    }

    removeLookFromDraft(look_id: string): Observable<any> {
        // Recupera os drafts do localStorage
        const drafts: any[] = JSON.parse(localStorage.getItem(this.localStorageDraftKey) || '[]');
    
        // Filtra para remover o look correspondente
        const updatedDrafts = drafts.filter(look => look.id !== look_id);
    
        // Se o look não for encontrado, lança um erro
        if (updatedDrafts.length === drafts.length) {
            return throwError(() => new Error('Look não encontrado.'));
        }
    
        // Atualiza o localStorage com a nova lista
        localStorage.setItem(this.localStorageDraftKey, JSON.stringify(updatedDrafts));
    
        return of({ success: true, message: 'Look removido com sucesso.' });
    }
}