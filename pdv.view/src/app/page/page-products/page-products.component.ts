
import { Component, inject, signal, viewChild } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { productCreate } from '../../models/createProduct.model';
import { product } from '../../models/product.mode';
import { ProductsService } from '../../service/products.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableComponent } from "../../shared/components/table/table.component";
import { MatTableModule } from '@angular/material/table';
import { category } from '../../models/category.model';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { TableColumn } from '../../models/tableColumn.model';
import { CategoriesService } from '../../service/category.service';
import { time } from 'console';

@Component({
  selector: 'app-page-products',
  standalone: true,
  imports: [FormsModule, NgClass, HttpClientModule, AsyncPipe, TableComponent, MatTableModule, ModalComponent],
  templateUrl: './page-products.component.html',
  styleUrl: './page-products.component.css'
})
export class PageProductsComponent {
  list = signal<boolean>(true);
  
  product = new product();
  category = new category();
  productCreate = new productCreate();
  
  selectedFile!: File;
  imageBase64: string = '';
  imageHash: string = '';

  displayedColumnsProduct: string[] = ['id', 'name', 'price', 'category'];
  displayedColumnsCategory: string[] = ['id', 'name'];

  fieldsProduct: string[] = ['ID', 'NOME', 'PREÇO', 'CATEGORIA'];
  fieldsCategory: string[] = ['ID', 'NOME'];

  dataSourceProduct = signal<Iproduct[]>([]);
  dataSourceCategory = signal<Icategory[]>([]);

  PrudctService = inject(ProductsService);
  CategoryService = inject(CategoriesService);

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

//#region SELECT ITEN
  selectProduct(item: any){
    this.product = item
  }
  
  selectCategory(item: any){
    this.category = item
  }

  selected(option: boolean) {  
    this.list.set(option);
  }
//#endregion

//#region CONVERT BASE64
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      if (this.selectedFile) {
        this.readFileAsBase64();
      }
    }
  }

  readFileAsBase64() {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      this.imageBase64 = (e.target as FileReader).result as string;
      // this.product.image = (e.target as FileReader).result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }
//#endregion

//#region CREATE
createProduct(product: productCreate){
  // this.readFileAsBase64();
  // timer(10000);
  // this.product.image = this.imageBase64;
  // console.log(this.product);
  // timer(10000)
  console.log(this.productCreate);
  this.PrudctService.createProduct(product).subscribe();

  this.PrudctService.getAllProducts().subscribe(products => {
    console.log(products)
  });

  this.loadProducts()
  this.productCreate = new productCreate();
}

createCategory(category: category){
  this.CategoryService.createCategory(category).subscribe();
  this.loadCategories()
}
//#endregion

//#region DELETE
  deleteProduct(idProduct: string){
    this.PrudctService.deleteProduct(idProduct).subscribe();
    this.loadProducts()
    this.product = new product();
  }

  deleteCategory(idCategory: string){
    this.CategoryService.deleteCategory(idCategory).subscribe();
    this.loadCategories()
    this.category = new product();
  }
//#endregion 

//#region UPDATE
  updateProduct(item: product){
    this.PrudctService.updateProduct(item.id, item).subscribe();
    this.product = new product();
    
    timer(100).pipe().subscribe(() => {
      this.loadProducts()
    })
  }

  updateCategory(item: category){
    this.CategoryService.updateCategory(item.id, item).subscribe()
    this.category = new category();

    this.loadCategories()
  }
//#endregion

  //#region LOAD DATA
  loadProducts(){
    this.PrudctService.getAllProducts().subscribe(products => {
      this.dataSourceProduct.set(products);
    });
  }

  loadCategories(){
    this.CategoryService.getAllCategories().subscribe(categories => {
      this.dataSourceCategory.set(categories);
    });
  }
  //#endregion

  closeModal(){
    this.product = new product();
    this.category = new category();
  }
}
export interface Iproduct{
  id: string;
  name: string;
  price: number;
  category: string;
}
export interface Icategory{
  id: string;
  name: string;
}