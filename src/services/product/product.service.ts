import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../../interfaces/product.interface";
import { Category } from "../../interfaces/category.interfaces";
import { SearchParameters } from "../../interfaces/search-parameters.interface";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    readonly baseProductUrl = 'https://dummyjson.com/products';

    constructor(private http: HttpClient) {}

    getProductCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseProductUrl + '/categories');
    }

    getProducts(searchParameters: SearchParameters): Observable<Product[]> {
        return this.http.get<{ products: Product[] }>(this.baseProductUrl).pipe(
            map(response => response.products)
        )
    }

}