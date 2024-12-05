import { isPlatformBrowser } from "@angular/common";
import { Directive, Inject, PLATFORM_ID, signal } from "@angular/core";

@Directive()
export class ModalSupporter{
    showModalBackground = signal(false);
    firstTimeOpeningModal = signal(true);
    constructor(){ }

    toggleOverflowHiddenBodyElement(value: boolean){}
}