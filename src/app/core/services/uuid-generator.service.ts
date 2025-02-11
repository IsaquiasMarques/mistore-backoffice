import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UUIDGenerator{

    static generate(): string{
        return crypto.randomUUID();
    }

}