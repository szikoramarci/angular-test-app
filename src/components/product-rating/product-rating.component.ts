import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  imports: [CommonModule],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.scss',
})
export class ProductRatingComponent {
  rating = input.required<number>();

  color = computed(() => {
    if (this.rating() > 4.5) {
      return 'great';
    }

    if (this.rating() > 3) {
      return 'average';
    }

    return 'awful';
  });
}
