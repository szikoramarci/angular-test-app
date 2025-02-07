import { AfterViewInit, Component, ElementRef, OnInit, output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../interfaces/category.interfaces';
import { SearchParameters } from '../../interfaces/search-parameters.interface';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'product-filter',
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit, AfterViewInit {

    categories: Category[] = []
    selectedCagegory!: Category;
    filterKeyword: string = '';
 
    searchParametersChanged = output<SearchParameters>();

    @ViewChild('filterKeywordInput') filterKeywordInput!: ElementRef;

    constructor(private product: ProductService) {}

    ngOnInit() {
        this.product.getProductCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    ngAfterViewInit(): void {
        this.initFilterKeywordInputListener();
    }

    initFilterKeywordInputListener() {
        fromEvent(this.filterKeywordInput.nativeElement, 'input')
          .pipe(
            debounceTime(250),
            map((event: any) => event.target.value)
          )
          .subscribe((value: string) => {
            this.filterKeyword = value
            this.updateSearchParameters()
          });
    }

    updateFilterKeyword(filterKeyword: string) {
        console.log(filterKeyword);
        this.filterKeyword = filterKeyword;
    }

    updateSelectedCategory(changeEvent: MatSelectChange) {
        const selectedCategory = this.categories.find((category) => category.slug === changeEvent.value)
        if (selectedCategory) {
            this.selectedCagegory = selectedCategory;
            this.updateSearchParameters()
        }        
    }

    updateSearchParameters() {
        this.searchParametersChanged.emit({
            selectedCategory: this.selectedCagegory,
            filterKeyword: this.filterKeyword
        });
    }
}