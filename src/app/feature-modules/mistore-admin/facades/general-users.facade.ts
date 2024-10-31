import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/api/api.service";

@Injectable({
    providedIn: 'root'
})
export class GeneralUserFacade{
    private API = inject(ApiService);
}