import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLoaderIdentifier } from '@core/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';
import { WalletFacade } from '@store/facades/wallet.facade';
import { IProduct } from '@store/models/product.model';
import { WALLET_PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { HorizontalBarChart } from '@core/interfaces/hz-bar-chart.interface';
import { PRODUCTS } from '@core/mocks/products.mock';

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

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Valor arrecadado'];
  tableProducts: IProduct[] = [];
  pageLoaderIdentifier = PageLoaderIdentifier;
  placeholderCount: number = 4;

  itemsPerPage = WALLET_PRODUCTS_LIMIT;
  totalItems = 0;
  currentPage = 1;
  totalPages!: number;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getProducts(pageParam, this.itemsPerPage);
    });
  }

  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, true);
    this.walletFacade.walletProducts(page, limit).subscribe({
      next: (incoming: IProduct[]) => {
        this.tableProducts = incoming;
        if(this.tableProducts.length > 0){

          this.totalItems = PRODUCTS.length;
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.WALLET_PRODUCTS);
        }
      },
    });
  }

}
