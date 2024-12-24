import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Directive, inject } from "@angular/core";

@Directive()
export class APIExtender{
    headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    protected http = inject(HttpClient);
}