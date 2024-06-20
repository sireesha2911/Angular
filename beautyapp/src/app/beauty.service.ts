import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BeautyProduct } from './models/beauty-product.model';

@Injectable({
  providedIn: 'root'
})
export class BeautyService {
  private apiUrl = 'http://localhost:3000/products'; // Update this to your actual API endpoint

  constructor(private http: HttpClient) {}

  getProducts(): Observable<BeautyProduct[]> {
    return this.http.get<BeautyProduct[]>(this.apiUrl);
  }

  getProductById(productId: number): Observable<BeautyProduct> {
    return this.http.get<BeautyProduct>(`${this.apiUrl}/${productId}`);
  }
}
