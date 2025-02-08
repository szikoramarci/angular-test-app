import { Routes } from '@angular/router';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { ProductListComponent } from '../components/product-list/product-list.component';

export const routes: Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
];
