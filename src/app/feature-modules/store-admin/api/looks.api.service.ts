import { Injectable } from "@angular/core";
import { StoreApi } from "./store.api.service";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { environment } from "@env/environment.development";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { map, Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LookApiService extends StoreApi{
    
    getLooks(page: number, limit_per_page: number): Observable<ILookResponse>{
        return this.http.get<ILook[]>(`${ environment.backend }/api/LookApi/GetLookByUser?shop_id=${ this.storeId }&page=${ page }&page_size=${ limit_per_page }&sortColumn=created_at&order=desc`,
            { headers: this.headers }
        )
        .pipe(
            map((incomingLooks: any) => ({
                total: incomingLooks.look_count,
                looks: Transformer.looks(incomingLooks.looks)
            }))
        )
    }

    getLookById(id: string): Observable<ILook[]>{
        return this.http.get<ILook[]>(`${ environment.backend }/api/LookApi/GetByIdlookDetails?id=${ id }`, { headers: this.headers })
                        .pipe(
                            map((incoming: any) => Transformer.looks(incoming.looks))
                        )
    }

    publishLook(look: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.post(`${ environment.backend }/api/LookApi/InsertLook`, look, { headers: localHeaders });
    }

    editLook(look: any): Observable<any>{
        // console.log(look, look.look_id, look.user_id);
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.put(`${ environment.backend }/api/LookApi/UpdateLook?look_id=${ look.look_id }&user_id=${ look.user_id }`, look, { headers: localHeaders });
    }

    updateLookProducts(data: any): Observable<any>{
        const localHeaders = new HttpHeaders().set('Content-Type', 'text/json');
        return this.http.put(`${ environment.backend }/api/LookApi/ProductListUpdate`, data, { headers: localHeaders });
    }

    deleteLook(look: any): Observable<any>{
        const options = {
            body: look,
            headers: { 'Content-Type': 'application/json' }
        };
        return this.http.delete<any>(`${ environment.backend }/api/LookApi/DeleteLook`, options);
    }

}