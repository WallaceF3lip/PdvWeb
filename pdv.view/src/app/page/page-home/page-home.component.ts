import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from "../../shared/components/table/table.component";
import { Iproduct } from '../../interface/product';
import { SaleService } from '../../service/sale.service';
import { Isale } from '../../interface/sale';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { sale } from '../../models/sale.model';
import { FormsModule } from '@angular/forms';
import { productCart } from '../../models/productCart.model';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [TableComponent, ModalComponent, FormsModule],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent implements OnInit{
  
  dataSourceSale = signal<Isale[]>([]);
  displayedColumnsSale: string[] = ['id', 'client', 'totalValue', 'paymentMethod'];
  fieldsSale: string[] = ['ID', 'CLIENTE', 'VALOR DE COMPRA', 'FORMA DE PAGAMENTO'];
  
  dataSourceSaleDetail = signal<Iproduct[]>([]);
  displayedColumnsSaleDetail: string[] = ['name', 'price', 'category'];
  fieldsSaleDetail: string[] = ['NOME', 'PREÇO', 'CATEGORIA'];

  sale = new sale();
  product = new productCart();
  
  SaleService = inject(SaleService)
  
  
  ngOnInit(): void {
    this.SaleService.getAllSales().subscribe((data) => {
      console.log(data)
      this.dataSourceSale.set(data)
    })
  }
  
  
  selectSale(item: any){
    this.SaleService.getSaleById(item.id).subscribe((data) => {
      this.dataSourceSaleDetail.set(data.products);
      this.sale = data;
      console.log(item.id);      
      console.log(data)
      console.log(data.products)
    })

    console.log(this.dataSourceSaleDetail());
    
  }
  
  closeModal() {
    // this.product = product
  }
  
  selectProduct($event: any) {
    console.log($event)
  }

  test(){}

  

}
