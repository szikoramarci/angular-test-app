import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../../interfaces/product.interface";
import { Category } from "../../interfaces/category.interfaces";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    readonly baseProductUrl = 'https://dummyjson.com/products';

    constructor(private http: HttpClient) {}

    getProductCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseProductUrl + '/categories');
    }

    getProducts(category: Category | null): Observable<Product[]> {
        const productURL = category ? category.url : this.baseProductUrl;
        return this.http.get<{ products: Product[] }>(productURL).pipe(
            map(response => response.products)
        )
    }

}