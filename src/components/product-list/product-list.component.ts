import { Component, inject, OnInit } from "@angular/core";
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../interfaces/product.interface";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { ProductItemComponent } from "../product-item/product-item.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { Category } from "../../interfaces/category.interfaces";
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";

@Component({
  selector: 'app-product-list',
  imports: [
    ProductFilterComponent,
    ProductItemComponent,
    MatGridListModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
    
    products: Product[] = []   
    selectedCategory: Category | null = null
    filterKeyword = ''   
    
    readonly productDialog = inject(MatDialog);
    
    constructor(private product: ProductService) {}

    ngOnInit() {
        this.searchProducts();
    }

    getFilteredProducts(): Product[] {
        return this.products.filter((product) => this.filterProduct(product));
    }

    filterProduct(product: Product) {               
        const filter = this.filterKeyword.toLocaleUpperCase()        
        if (filter.length === 0) return true;

        return product.title.toLocaleUpperCase().includes(filter)
    }

    searchProducts() {
        this.product.getProducts(this.selectedCategory).subscribe((products) => {
            this.products = products;
        });
    }

    updateSelectedCategory(selectedCategory: Category | null) {  
        this.selectedCategory = selectedCategory;        
        this.searchProducts();
    }

    updateFilterKeyword(filterKeyword: string) {  
        this.filterKeyword = filterKeyword;                
    }    

    openProductDialog(product: Product) {
        this.productDialog.open(ProductDialogComponent, { data: {
            product: product
        }});
    }
}
