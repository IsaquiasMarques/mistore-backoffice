import { Injectable, signal, Signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TableItemSelection{

    private items$: WritableSignal<any[]> = signal<any[]>([]);
    private items: any[] = [];

    get getItems(): Signal<any[]>{
        return this.items$;
    }

    set setItems(items: any[]){
        items.forEach(item => {
            let theItem = this.items.find(i => i.id === item.id);
            if(theItem === undefined){
                this.items.push(item);
            }
        })
        this.items$.set(this.items);
    }

    pushItems(items: any[]){
        // this.items.push()
    }

    clearItems(){
        this.items$.set([]);
    }
    
}