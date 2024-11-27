import { HttpHeaders } from "@angular/common/http";
import { Directive } from "@angular/core";

@Directive()
export class APIExtender{
    headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    storeId: string = '1c13d9e3-41a3-47c5-83ae-8785441c878b';
}