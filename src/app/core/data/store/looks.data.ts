import { computed, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { Store, StoredataInterface } from "./store.interface";
import { ILook, ILookResponse } from "@store/models/looks.model";

@Injectable({
    providedIn: 'root'
})
export class LooksData implements StoredataInterface{

    private paginatedLooks: WritableSignal<Store> = signal({ total: 0, pages: { 0: [] } });
    private generalLooks: WritableSignal<ILookResponse> = signal({ total: 0, looks: [] });

    paginatedData(page: number, total: number, data: any[]): void {
        this.paginatedLooks.update(obj => ({
            ...obj,
            total: total,
            pages: {
                ...obj.pages,
                [page]: obj.pages[page] ? obj.pages[page] : data
            }
        }));
    }

    nonPaginatedData(total:  number, data: any[]): void {
        this.generalLooks.set(
            {
                ...this.generalLooks(),
                total: total,
                looks: [ ...this.generalLooks().looks, ...data ]
            }
        );
    }

    dataOfPage(page: number): Signal<ILookResponse> {
        return computed(() => ({ total: this.paginatedLooks().total, looks: this.paginatedLooks().pages[page] }));
    }

    allDatas(): Signal<ILookResponse> {
        return computed(() => ({ total: this.generalLooks().total, looks: this.generalLooks().looks }));
    }
}