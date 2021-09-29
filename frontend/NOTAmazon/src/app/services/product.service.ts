import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number, page: number, pageSize: number): Observable<GetResponse> {
    
    let url = this.baseUrl;

    if (categoryId !== 0) {
      url = `${url}/search/findByCategoryId?id=${categoryId}`;
      url = `${url}&page=${page}&size=${pageSize}`;
    } else {
      url = `${url}?page=${page}&size=${pageSize}`
    }    

    return this.httpClient.get<GetResponse>(url);
  }

  getSpecificProduct(productId?: any) {
    let url = this.baseUrl;

    if (productId === null) {
      productId = 1;
    }

    url += '/' + productId;

    return this.httpClient.get<GetResponse>(url);
  }

  searchProductList(keyword: any, page: number, pageSize: number) {
  
    let url = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    url = `${url}&page=${page}&size=${pageSize}`
    return this.httpClient.get<GetResponse>(url);
  }
}



interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
