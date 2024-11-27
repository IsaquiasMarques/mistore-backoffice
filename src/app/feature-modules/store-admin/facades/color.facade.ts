import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ColorFacade{
    private API = inject(ApiService);

    all(): Observable<ColorOption[]>{
        return this.API.getColors();
    }
}