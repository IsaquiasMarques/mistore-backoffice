import { Injectable } from "@angular/core";
import { StoreApi } from "./store.api.service";

@Injectable({
    providedIn: 'root'
})
export class GenericApiService extends StoreApi{

}