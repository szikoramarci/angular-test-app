import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from '../product-rating/product-rating.component';

@Component({
  selector: 'app-product-item',
  imports: [MatCardModule, CommonModule, ProductRatingComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  product = input.required<Product>();
}
