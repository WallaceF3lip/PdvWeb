import { Component, inject, signal } from '@angular/core';
import { TableComponent } from "../../shared/components/table/table.component";
import { ProductsService } from '../../service/products.service';
import { Iproduct } from '../../interface/product';
import { product } from '../../models/product.mode';

@Component({
  selector: 'app-page-flux-control',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './page-flux-control.component.html',
  styleUrl: './page-flux-control.component.css'
})
export class PageFluxControlComponent {


  displayedColumns: string[] = ['id', 'name', 'price', 'category'];

  dataSource = signal<product[]>([]);

  PrudctService = inject(ProductsService);

  ngOnInit() {
    this.PrudctService.getAllProducts().subscribe(products => {
      this.dataSource.set(products);
    });
  }
}
