import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscriber } from '@shared/component-classes/subcriber/unsubscriber.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LOOKS } from '@core/mocks/looks.mock';
import { LoaderService } from '@core/services/loader/loader.service';
import { LOOKS_LIMT } from '@shared/constants/data-limit.const';
import { LookFacade } from '@store/facades/looks/look.facade';
import { ILook, ILookResponse } from '@store/models/looks.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mi-looks',
  templateUrl: './looks.component.html',
  styleUrl: './looks.component.css'
})
export class LooksComponent
extends Unsubscriber
implements OnInit {
  private lookFacade = inject(LookFacade);
  private activatedRoute = inject(ActivatedRoute);
  
  loaderService = inject(LoaderService);
  pageLoaderIdentifier = PageLoaderIdentifier;

  searchTerm = signal<string>('');

  allLooks: ILook[] = [];
  displayableAllLooks: ILook[] = [];

  draftLooks: ILook[] = [];

  currentPageAllLooks: number = 1;
  currentPageDraftLooks: number = 1;

  totalItemsAllLooks: number = 0;
  totalItemsDraftLooks: number = 0;
  
  allLooksPages: number[] = [];
  draftLooksPages: number[] = [];
  
  placeholderCount: number = 8;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(query => {
      this.currentPageAllLooks = parseInt(query.get('page') ?? '1');

      this.getDraftLooks();
      this.getAllLooks();
    });
  }

  private getDraftLooks(): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS_ON_DRAFT, true)
    this.lookFacade.looksOnDraft(this.currentPageAllLooks, 4).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (incoming: ILookResponse) => {
        this.draftLooks = incoming.looks;
        if(this.draftLooks.length > 0){
          this.totalItemsDraftLooks = incoming.total;
          this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS_ON_DRAFT, false);
          this.calculatePagesForDraftLooks();
        } else {
          this.loaderService.loaderActionAfterTryFetching(PageLoaderIdentifier.LOOKS_ON_DRAFT);
        }
      }
    })
  }

  private getAllLooks(): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS, true)
    this.lookFacade.looks(this.currentPageAllLooks, LOOKS_LIMT).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (incoming: ILookResponse) => {
        this.allLooks = incoming.looks;
        if(this.allLooks.length > 0){
          this.totalItemsAllLooks = incoming.total;
          this.searchByTerm();
          this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS, false);
          this.calculatePagesForAllLooks();
        } else {
          this.loaderService.loaderActionAfterTryFetching(PageLoaderIdentifier.LOOKS);
        }
      }
    })
  }

  searchByTerm(): void{
    let filtered = this.allLooks.filter(item => item.name.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase()));
    this.displayableAllLooks = (this.searchTerm().length > 0) ? filtered : this.allLooks; 
  }
  
  calculatePagesForAllLooks(){
    let pagesCount = 0;
    let remain = this.totalItemsAllLooks % LOOKS_LIMT;

    if(remain === 0){
        pagesCount = Math.floor(this.totalItemsAllLooks / LOOKS_LIMT);

    }else{
        pagesCount = Math.floor(this.totalItemsAllLooks / LOOKS_LIMT) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
        let page = this.allLooksPages.find(item => item === index);
        if(!page){
            this.allLooksPages.push(index);
        }else{
            return;
        }
    }

  }
  
  calculatePagesForDraftLooks(){
    let pagesCount = 0;
    let remain = this.totalItemsDraftLooks % LOOKS_LIMT;

    if(remain === 0){
        pagesCount = Math.floor(this.totalItemsDraftLooks / LOOKS_LIMT);

    }else{
        pagesCount = Math.floor(this.totalItemsDraftLooks / LOOKS_LIMT) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
        let page = this.draftLooksPages.find(item => item === index);
        if(!page){
            this.draftLooksPages.push(index);
        }else{
            return;
        }
    }

  }

}
