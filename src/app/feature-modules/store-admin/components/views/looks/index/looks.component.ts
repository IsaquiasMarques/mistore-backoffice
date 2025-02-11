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

  currentPageDraftLooks: number = 1;
  currentPageAllLooks: number = 1;
  currentPagePublishedLooks: number = 1;
  currentPageDeletedLooks: number = 1;

  totalItemsDraftLooks: number = 0;
  totalItemsAllLooks: number = 0;
  totalItemsPublishedLooks: number = 0;
  totalItemsDeletedLooks: number = 0;
  
  draftLooksPages: number[] = [];
  allLooksPages: number[] = [];
  publishedLooksPages: number[] = [];
  deletedLooksPages: number[] = [];

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(query => {
      this.currentPageDraftLooks = parseInt(query.get('draft_page') ?? '1');
      this.currentPageAllLooks = parseInt(query.get('all_looks_page') ?? '1');
      this.currentPagePublishedLooks = parseInt(query.get('published_looks_page') ?? '1');
      this.currentPageDeletedLooks = parseInt(query.get('deleted_looks_page') ?? '1');

      this.getDraftLooks();
      this.getAllLooks();
    });
  }

  private getDraftLooks(): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.LOOKS_ON_DRAFT, true)
    this.lookFacade.looksOnDraft(this.currentPageDraftLooks, 4).pipe(takeUntil(this.unsubscribe)).subscribe({
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
