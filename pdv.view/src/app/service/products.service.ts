import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../models/product.model';
import { Observable } from 'rxjs';
import { productCreate } from '../models/createProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<product[]> {
    return this.http.get<product[]>(`http://localhost:8000/product/getAll`);
  }

  getProductById(id: string): Observable<product> {
    return this.http.get<product>(`http://localhost:8000/product/getById/${id}`);
  }

  createProduct(product: productCreate) {
    return this.http.post<productCreate>(`http://localhost:8000/product/create`, product);
  }

  updateProduct(id: string, product: product){
    return this.http.put<productCreate>(`http://localhost:8000/product/update/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<void>(`http://localhost:8000/product/delete/${id}`);
  }
}
