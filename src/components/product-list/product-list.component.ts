import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../interfaces/product.interface";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { SearchParameters } from "../../interfaces/search-parameters.interface";

@Component({
  selector: 'product-list',
  imports: [
    ProductFilterComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
    
    products: Product[] = [];
    searchParameters: SearchParameters = {
        selectedCategory: null,
        filterKeyword: ''
    }
    
    constructor(private product: ProductService) {}

    ngOnInit() {
        this.searchProducts();
    }

    searchProducts() {
        this.product.getProducts(this.searchParameters).subscribe((products) => {
            this.products = products;
        });
    }

    updateSearchParameters(searchParameters: SearchParameters) {  
        console.log(searchParameters);  
        this.searchParameters = searchParameters;
        this.searchProducts();
    }
}
