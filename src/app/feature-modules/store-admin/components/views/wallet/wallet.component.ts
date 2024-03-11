import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@app/core/Enums/page-loader-id.enum';
import { LoaderService } from '@app/core/services/loader/loader.service';
import { WalletFacade } from '@app/feature-modules/store-admin/facades/wallet.facade';
import { IProduct } from '@app/feature-modules/store-admin/models/product.model';
import { WALLET_PRODUCTS_LIMIT } from '@app/shared/constants/data-limit.const';
import { HorizontalBarChart } from '@core/interfaces/hz-bar-chart.interface';

@Component({
  selector: 'mi-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

  private walletFacade = inject(WalletFacade);
  private activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);

  horizontalChart: HorizontalBarChart = {
    details: {
      title: 'Dados por produtos',
      description: 'Análise de estados de produtos por venda',
      chartUnity: 'AOA',
      toolpit: true
    },
    labels: [
      "Jan",
      "Fev",
      // "Mar",
      // "Abr",
      // "Mai",
      // "Jun",
      // "Jul",
      // "Ago",
      // "Set",
      // "Out",
      // "Nov",
      // "Dez"
    ],
    series: [
      {
        name: 'Ganhos',
        color: '#61C554',
        data: [
          10123,
          13345,
          // 35235,
          // 25223,
          // 64213,
          // 23000,
          // 50522,
          // 23409,
          // 21345,
          // 53234,
          // 34563,
          // 54322
        ]
      },
      {
        name: 'Perdas',
        color: "#ddd",
        data: [
          13000,
          23000,
          // 45123,
          // 35342,
          // 56000,
          // 23553,
          // 70000,
          // 23409,
          // 21345,
          // 64234,
          // 14563,
          // 14322
        ]
      }
    ]
  }

  tableProducts: IProduct[] = [];
  pageLoaderIdentifier = PageLoaderIdentifier;

  itemsPerPage = 5; // Número de itens por página
  totalItems = 100; // Número total de itens
  currentPage = 1; // Página atual
  totalPages!: number; // Número total de páginas

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.getProducts(WALLET_PRODUCTS_LIMIT, pageParam);
    });
  }

  getProducts(limit?: number, offset?: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, true);
    this.walletFacade.walletProducts(limit, offset).subscribe({
      next: (incoming: IProduct[]) => {
        this.tableProducts = incoming;
        if(this.tableProducts.length > 0){
          this.calculateTotalPages();
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.WALLET_PRODUCTS);
        }
      },
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  generatePageNumbers(): number[] {
    const visiblePages = Math.min(this.totalPages, 5); // Número máximo de páginas visíveis
    const startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2)); // Página inicial
    const endPage = Math.min(this.totalPages, startPage + visiblePages - 1); // Página final

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
