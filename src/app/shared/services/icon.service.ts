import { Injectable, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class IconService implements OnInit{
    
    // constructor(private route: ActivatedRoute) {}

    // $activeParam!: string;
    
    ngOnInit(): void {
        // console.log(this.route.snapshot.url);
    }

}