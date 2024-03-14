import { PRODUCTS } from "@core/mocks/products.mock";
import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{

    createDb() {

        const products = PRODUCTS;
        return { products };

    }

}