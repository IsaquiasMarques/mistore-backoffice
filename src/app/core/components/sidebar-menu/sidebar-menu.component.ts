import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISidebar } from '@app/core/interfaces/sidebar.interface';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent implements OnInit, OnChanges {
  @Input() sidebarMenuItems: ISidebar[] = [];

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
