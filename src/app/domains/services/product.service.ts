import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  constructor() { }

  getProduct() {
    const url = new URL('https://api.escuelajs.co/api/v1/products?limit=100&offset=5');   
    return this.http.get<Product[]>(url.href)
  }
}
