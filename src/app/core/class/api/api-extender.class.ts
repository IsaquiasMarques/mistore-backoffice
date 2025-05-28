import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Directive, inject } from "@angular/core";

@Directive()
export class APIExtender{
    
    protected storeId: string = '1c13d9e3-41a3-47c5-83ae-8785441c878b';

    headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    protected http = inject(HttpClient);
}