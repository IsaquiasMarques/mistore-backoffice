import { inject, Injectable } from "@angular/core";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { GenericApiService } from "@store/api/generic.api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ColorFacade{
    private api = inject(GenericApiService);

    all(): Observable<ColorOption[]>{
        return this.api.getColors();
    }
}