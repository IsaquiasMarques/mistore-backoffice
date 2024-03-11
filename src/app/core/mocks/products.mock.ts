import { ProductStatusEnum } from "@app/feature-modules/store-admin/enums/products-status.enum";
import { IProduct } from "@app/feature-modules/store-admin/models/product.model";

export const PRODUCTS: IProduct[] = [
    {
      id: '',
      ID: 22739,
      imagePath: 'assets/images/products/image-1.png',
      name: 'Topshop knit midi sweater dress in gray heather',
      category: 'Winter',
      subcategory: 'Winter',
      status: ProductStatusEnum.AVAILABLE,
      quantity: 636,
      created_at: '06/01/2024',
      price: 2000,
      money_raised: 173000
    },
    {
      id: '',
      ID: 43756,
      imagePath: 'assets/images/products/image-2.png',
      name: 'Nike air force 4',
      category: 'Kids',
      subcategory: 'Kids',
      status: ProductStatusEnum.UNAVAILABLE,
      quantity: 193,
      created_at: '06/01/2024',
      price: 2000,
      money_raised: 173000
    },
    {
      id: '',
      ID: 39635,
      imagePath: 'assets/images/products/image-3.png',
      name: 'Vestido de noiva BAIL',
      category: 'Beverages',
      subcategory: 'Beverages',
      status: ProductStatusEnum.AVAILABLE,
      quantity: 0,
      created_at: '06/01/2024',
      price: 2000,
      money_raised: 927000
    },
    {
      id: '',
      ID: 97174,
      imagePath: 'assets/images/products/image-4.png',
      name: 'T-shirt branca Polo',
      category: 'Beauty and Cosmetics',
      subcategory: 'Beauty and Cosmetics',
      status: ProductStatusEnum.AVAILABLE,
      quantity: 1311,
      created_at: '15/05/2020',
      price: 109000,
      money_raised: 60000
    },
    {
      id: '',
      ID: 97174,
      imagePath: '',
      name: 'T-shirt branca Polo',
      category: 'Beauty and Cosmetics',
      subcategory: 'Beauty and Cosmetics',
      status: ProductStatusEnum.AVAILABLE,
      quantity: 1311,
      created_at: '15/05/2020',
      price: 109000,
      money_raised: 50000
    },
    {
      id: '',
      ID: 97174,
      imagePath: '',
      name: 'T-shirt branca Polo',
      category: 'Beauty and Cosmetics',
      subcategory: 'Beauty and Cosmetics',
      status: ProductStatusEnum.UNAVAILABLE,
      quantity: 1311,
      created_at: '15/05/2020',
      price: 109000,
      money_raised: 6000
    },
    {
      id: '',
      ID: 97174,
      imagePath: '',
      name: 'T-shirt branca Polo',
      category: 'Beauty and Cosmetics',
      subcategory: 'Beauty and Cosmetics',
      status: ProductStatusEnum.UNAVAILABLE,
      quantity: 1311,
      created_at: '15/05/2020',
      price: 109000,
      money_raised: 6000
    },
]