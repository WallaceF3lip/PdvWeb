import { Component, inject, OnInit, signal } from '@angular/core';
import { product } from '../../models/product.model';
import { productCart } from '../../models/productCart.model';
import { PdvCardProductComponent } from "../../shared/components/pdv/pdv-card-product/pdv-card-product.component";
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { TableComponent } from "../../shared/components/table/table.component";
import { TableColumn } from '../../models/tableColumn.model';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { sale } from '../../models/sale.model';
import { SaleService } from '../../service/sale.service';

@Component({
  selector: 'app-page-pdv',
  standalone: true,
  templateUrl: './page-pdv.component.html',
  styleUrl: './page-pdv.component.css',
  imports: [
  FormsModule,
  PdvCardProductComponent,
  TableComponent,
  ModalComponent]
})
export class PagePdvComponent implements OnInit{
  
  public fieldsProduct: string[] = ['NOME', 'PREÇO', 'CATEGORIA', 'QUANTIDADE'];
  public displayedColumnsProduct: string[] = ['name', 'price', 'category', 'quantity'];

  public product = new productCart();
  public products: Array<product> = [];
  public cartProducts = signal<productCart[]>([]);
  public sale = new sale();
  
  PrudctService = inject(ProductsService);
  SaleService = inject(SaleService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    this.PrudctService.getAllProducts().subscribe(products => {
      this.products.push(...products);
    });
  }

  addToCart(product: any){
    let exist = true;
    //Verificar se o item existe
    for( let i = 0; i < this.cartProducts().length; i++){
      //Alterar quantidade de um item
      if(this.cartProducts()[i].name == product.name){          
        this.cartProducts()[i].quantity = product.quantity;
        exist = false;
      }
    }
    //Add item
    if(exist){          
      this.cartProducts.set([...this.cartProducts(), product]);
    }
    console.log(this.cartProducts());      
  }

  totalAmount(): number{
    let totalAmount: number = 0
    for(let item of this.cartProducts()){
      totalAmount += item.price * item.quantity;
    }
    return totalAmount
  }

    updateProduct(product: any){ //RETORNA COMO NUM
    let id = String(this.cartProducts().indexOf(product));
    this.cartProducts().filter(product => {
      if(product.id == id){
        product.quantity = this.product.quantity
      }}
    );
  }

  selectItem(item: any){
    this.product = item;
  }

  deleteProduct(product : any){
    let id = this.cartProducts().indexOf(product);
    this.cartProducts().splice(id, 1);

    this.cartProducts.set([...this.cartProducts()]);
  }

  finishSale() {
    let totalAmount = this.totalAmount();

    this.sale.totalValue = totalAmount;
    this.sale.date = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    this.sale.products = this.cartProducts();    
    this.sale.pending = false;

    this.SaleService.createSale(this.sale).subscribe(
      () => {
        console.log("Venda concluida", this.sale);
      }
    );
    this.cartProducts = signal<productCart[]>([]);
    this.sale = new sale();
  }
  pendingSale() {
    let totalAmount = this.totalAmount();

    this.sale.totalValue = totalAmount;
    this.sale.date = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    this.sale.products = this.cartProducts();    
    this.sale.pending = true;

    this.SaleService.createSale(this.sale).subscribe(
      () => {
        console.log("Venda Pendente", this.sale);
      }
    );
    this.cartProducts = signal<productCart[]>([]);
    this.sale = new sale();
  }
  cancelSale() {
    this.cartProducts.set([]);
  }
  
  closeModal() {
    this.product = new productCart();
  }

  NumberKey(key: any){
    console.log("teste: ", key);
    var charCode = (key.which) ? key.which : key.keyCode;
    if(charCode >= 46 && charCode <= 57){
      return true;
    }
    return false;
  }
}
export interface Iproduct{
  id: string;
  name: string;
  price: number;
  category: string;
}