import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mistore-admin',
  templateUrl: './mistore-admin.component.html',
  styleUrl: './mistore-admin.component.css'
})
export class MistoreAdminComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarElement') sidebaerElementRef!: ElementRef<HTMLElement>;
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLElement>;
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }
}
