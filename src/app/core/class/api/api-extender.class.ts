import { HttpHeaders } from "@angular/common/http";
import { Directive } from "@angular/core";

@Directive()
export class APIExtender{
    headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');
    storeId: string = '9c84acac-6c0b-4d6a-82b7-0a9184d33cee';
}