import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { sale } from "../models/sale.model";

@Injectable({
    providedIn: 'root'
})
export class SaleService{
    
    constructor(private http: HttpClient) { }

    getAllSales() {
        return this.http.get<any>(`http://localhost:8000/sale/getAll`);
    }

    getSaleById(id: string) {
        return this.http.get<any>(`http://localhost:8000/sale/getById/${id}`);
    }

    createSale(sale: sale) {
        return this.http.post<sale>(`http://localhost:8000/sale/create`, sale);
    }

    updateSale(id: string, sale: any) {
        return this.http.put<any>(`http://localhost:8000/sale/update/${id}`, sale);
    }

    deleteSale(id: string) {
        return this.http.delete<any>(`http://localhost:8000/sale/delete/${id}`);
    }
}