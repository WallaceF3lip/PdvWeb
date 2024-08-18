import { Component, signal, Input, Output, EventEmitter, computed, model } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { product } from '../../../models/product.model';
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

  // _dataSource = model<StAsyncTableSource>(new StAsyncTableSource()); 

  // @Input() set dataSource(dataSource: StAsyncTableSource) {
  //   this._dataSource.set(dataSource);
  // }

  // get dataSource(): Signal<StAsyncTableSource>{
  //   return this._dataSource;
  // }
  

  @Input()
  set dataSource(value: any[]) {
    this.$dataSource.set(value);
  }

  get dataSource() {
    return this.$dataSource();
  }

  $dataSource = signal<any[]>([]);
  dataSourceComputed = computed(() => this.$dataSource());

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
