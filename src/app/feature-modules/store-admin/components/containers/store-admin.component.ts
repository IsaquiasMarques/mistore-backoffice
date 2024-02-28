import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { BadgeColorEnum } from '@app/core/Enums/badge.enum';
import { ISidebar } from '@app/core/interfaces/sidebar.interface';
import { filter } from 'rxjs/operators';

const INITIAL_INDEX: number = 0;

@Component({
  selector: 'app-store-admin',
  templateUrl: './store-admin.component.html',
  styleUrl: './store-admin.component.css'
})
export class StoreAdminComponent implements OnInit, AfterViewInit {

  router = inject(Router);
  route = inject(ActivatedRoute);

  @ViewChild('sidebarElement') sidebaerElementRef!: ElementRef<HTMLElement>;
  @ViewChild('bodyContainer') bodyContainer!: ElementRef<HTMLElement>;
  
  sidebarMenuItems: ISidebar[] = [
    {
      fieldset: 'Categorias',
      items: [
        {
          icon: { iconRef: 'grid' },
          label: 'Visão Geral',
          routeTo: 'dashboard',
          active: false
        },
        {
          icon: { iconRef: 'wallet' },
          label: 'Carteira',
          routeTo: 'wallet',
          active: false
        },
        {
          icon: { iconRef: 'shopping-cart' },
          label: 'Produtos',
          routeTo: 'products',
          active: false
        },
        {
          icon: { iconRef: 'gift' },
          label: 'Promoções',
          routeTo: 'promotions',
          active: false
        },
        {
          icon: { iconRef: 'heart-rounded' },
          label: 'Favoritos',
          routeTo: 'favorites',
          active: false
        }
      ]
    },
    {
      fieldset: 'Geral',
      items: [
        {
          icon: { iconRef: 'message-dots-circle' },
          label: 'Mensagens',
          routeTo: 'messages',
          active: false,
          bagde: {
            label: '4',
            color: BadgeColorEnum.ALERT
          }
        },
        {
          icon: { iconRef: 'alert-circle' },
          label: 'Ajuda',
          routeTo: 'help',
          active: false
        },
        {
          icon: { iconRef: 'settings' },
          label: 'Definições',
          routeTo: 'settings',
          active: false
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.captuteSnapshot();
    });
    
    this.captuteSnapshot();
  }

  ngAfterViewInit(): void {
  }


  captuteSnapshot(){
    if(this.route.snapshot.children && this.route.snapshot.children[INITIAL_INDEX]){
      if(this.route.snapshot.children[INITIAL_INDEX].url && this.route.snapshot.children[INITIAL_INDEX].url[INITIAL_INDEX]){
        let path = this.route.snapshot.children[INITIAL_INDEX].url[INITIAL_INDEX].path;
        let sidebarIndex: number = this.getSidebarIndex(path);
        let sidebarItemIndex: number = this.getSidebarItemIndex(path, sidebarIndex);
        
        this.changeActiveItemOnMenu(sidebarIndex, sidebarItemIndex);
      }
    }
  }

  getSidebarIndex(path: string): number{
    return this.sidebarMenuItems.findIndex(sidebarItem => {
      let wantedItem = sidebarItem.items.findIndex(item => item.routeTo === path);
      if(wantedItem != -1){
        return true;
      }else{
        return false;
      }
    });
  }

  getSidebarItemIndex(path: string, sidebarIndex: number): number{
    return this.sidebarMenuItems[sidebarIndex].items.findIndex(item => item.routeTo === path);
  }

  changeActiveItemOnMenu(sidebarIndex: number, sidebarItemIndex: number): void{
    this.deactivateAllOthers();
    this.sidebarMenuItems[sidebarIndex].items[sidebarItemIndex].active = true;
  }

  deactivateAllOthers(): void{
    this.sidebarMenuItems.forEach(sidebar => {
      sidebar.items.forEach(item => item.active = false);
    });
  }

}
