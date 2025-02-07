import { Signal } from "@angular/core";

export interface Store{
    total: number,
    pages: {
        [page: number]: any[]
    }
}

export interface StoredataInterface{
    paginatedData(page: number, total: number, data: any[]): void;
    nonPaginatedData(total: number, data: any[]): void;
    dataOfPage(page: number): Signal<any>;
    allDatas(): Signal<any>;
}