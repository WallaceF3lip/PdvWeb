import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { category } from "../models/category.model";


@Injectable({
providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<category[]> {
        return this.http.get<category[]>(`http://localhost:8000/category/getAll`);
    }

    getCategoryById(id: string): Observable<category> {
        return this.http.get<category>(`http://localhost:8000/category/getById/${id}`);
    }

    createCategory(category: category) {
        return this.http.post<category>(`http://localhost:8000/category/create`, category);
    }

    updateCategory(id: string, category: category){
        return this.http.put<category>(`http://localhost:8000/category/update/${id}`, category);
    }

    deleteCategory(id: string) {
        return this.http.delete<void>(`http://localhost:8000/category/delete/${id}`);
    }
}
