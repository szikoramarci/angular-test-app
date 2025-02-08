import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-dialog',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  isProductFavourite = false;

  constructor(private favorite: FavoriteService) {}

  ngOnInit(): void {
    this.isProductFavourite = this.favorite.isProductFavorite(
      this.data.product.id
    );
  }

  toggleFavorite(product: Product) {
    this.isProductFavourite = this.favorite.toggleProductFavorite(product.id);
  }
}
