import { Component, signal, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { product } from '../../models/product.model';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-page-about',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.css'
})
export class PageAboutComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'category'];
  dataSource = signal<Iproduct[]>([]);
  clickedRows = new Set<Iproduct>();

  TESTE(prod: Iproduct){
    console.log("TESTE ->", prod);
    this.clickedRows.add(prod);
  }

  listProducts = signal<product[]>([]);
  PrudctService = inject(ProductsService);

  ngOnInit() {
    this.PrudctService.getAllProducts().subscribe(products => {
      this.listProducts.set(products);      
      this.dataSource.set(products);
      // this.clickedRows.add(products[0]);
    });
  }
}

const ELEMENT_DATA_: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA: Iproduct[] = []

/**
 * @title Binding event handlers and properties to the table rows.
 */
// @Component({
//   selector: 'table-row-binding-example',
//   styleUrl: './page-about.component.css',
//   templateUrl: './page-about.component.html',
//   standalone: true,
//   imports: [MatTableModule],
// })

// export class TableRowBindingExample {

//   displayedColumns: string[] = ['id', 'name', 'price', 'category'];
//   dataSource = signal<Iproduct[]>([]);
//   clickedRows = new Set<Iproduct>();

//   TESTE(prod: Iproduct){
//     console.log("TESTE ->", prod.name);
//     this.clickedRows.add(prod);
//   }

//   listProducts = signal<product[]>([]);
//   PrudctService = inject(ProductsService);

//   ngOnInit() {
//     this.PrudctService.getAllProducts().subscribe(products => {
//       this.listProducts.set(products);      
//       this.dataSource.set(products);
//       // this.clickedRows.add(products[0]);
//     });
//   }
// }

export interface Iproduct{
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}