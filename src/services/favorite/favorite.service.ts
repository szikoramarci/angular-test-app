import { Injectable } from "@angular/core";
import { StorageService } from "../storage/storage.service";

const STORAGE_KEY = 'favorites';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {

    readonly storageKey = 'favorites';

    constructor(private storage: StorageService) { 
        this.initFavoriteStorage();
    }

    initFavoriteStorage() {
        if (!this.storage.getItem(STORAGE_KEY)) {
            this.storage.setItem(STORAGE_KEY, []);
        }
    }

    getFavorites(): Set<number> {
        return new Set<number>(this.storage.getItem(STORAGE_KEY));
    }

    isProductFavorite(productId: number): boolean {
        return this.getFavorites().has(productId);
    }

    addProductToFavorites(productId: number) {
        const favorites = this.getFavorites();
        favorites.add(productId);
        this.storage.setItem(STORAGE_KEY, Array.from(favorites));
    }

    removeProductFromFavorites(productId: number) {
        const favorites = this.getFavorites();
        favorites.delete(productId);
        this.storage.setItem(STORAGE_KEY, Array.from(favorites));
    }

    toggleProductFavorite(productId: number): boolean {
        if (this.isProductFavorite(productId)) {
            this.removeProductFromFavorites(productId);
        } else {
            this.addProductToFavorites(productId);
        }
        return this.isProductFavorite(productId);
    }

}