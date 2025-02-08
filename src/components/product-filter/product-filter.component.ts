import { AfterViewInit, Component, ElementRef, OnInit, output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../interfaces/category.interfaces';
import { debounceTime, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  imports: [
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit, AfterViewInit {

    categories: Category[] = []
    selectedCagegory: Category | null = null
    filterKeyword = '';
 
    selectedCategoryChanged = output<Category | null>();
    filterKeywordChanged = output<string>();

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
        fromEvent<Event>(this.filterKeywordInput.nativeElement, 'input')
          .pipe(
            debounceTime(250),
            filter((event): event is InputEvent & { target: HTMLInputElement } => 
              event.target instanceof HTMLInputElement
            ),
            map(event => event.target.value)
          )
          .subscribe((value: string) => {
            this.filterKeyword = value
            this.filterKeywordChanged.emit(value)
          });
    }

    updateSelectedCategory(changeEvent: MatSelectChange) {
        this.selectedCagegory =  this.categories.find((category) => category.slug === changeEvent.value) || null        
        this.selectedCategoryChanged.emit(this.selectedCagegory)
    }
}