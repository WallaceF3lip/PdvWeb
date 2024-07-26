import { Component, signal, Input, Output, EventEmitter } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { product } from '../../../models/product.mode';
import { Iproduct } from '../../../interface/product';
import { TableColumn } from '../../../models/tableColumn.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {


  @Input()
  displayedColumns: string[] = [];

  @Input()
  fields: string[] = [];
  
  @Input()
  $dataSource = signal<any[]>([]);

  @Output()
  selectItem = new EventEmitter<any>();

  clickedRows = new Set<Iproduct>();

  fildname(item: string){
    return this.fields[this.displayedColumns.indexOf(item)];
  }

  selectProduct(prod: product){
    this.selectItem.emit(prod);
    this.clickedRows.add(prod);
    return prod;
  }
}

