import { AfterViewInit, ElementRef, ViewChild } from "@angular/core";

export interface TableComponentInterface extends AfterViewInit{

    theadElementRef: ElementRef<HTMLElement>;
    selectedDetailsStickyTopSpacing: number;

    toggleSelect(): void;

}