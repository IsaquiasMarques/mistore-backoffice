import { inject, Injectable } from "@angular/core";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { StoreApi } from "@store/api/store.api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ColorFacade{
    private API = inject(StoreApi);

    all(): Observable<ColorOption[]>{
        return this.API.getColors();
    }
}