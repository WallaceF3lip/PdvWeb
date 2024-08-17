import { Component, inject, signal } from '@angular/core';
import { product } from '../../models/product.model';
import { productCart } from '../../models/productCart.model';
import { PdvCardProductComponent } from "../../shared/components/pdv/pdv-card-product/pdv-card-product.component";
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { TableComponent } from "../../shared/components/table/table.component";
import { TableColumn } from '../../models/tableColumn.model';

@Component({
    selector: 'app-page-pdv',
    standalone: true,
    templateUrl: './page-pdv.component.html',
    styleUrl: './page-pdv.component.css',
    imports: [
    FormsModule,
    PdvCardProductComponent,
    TableComponent
]
})
export class PagePdvComponent {
  

  displayedColumnsProduct: string[] = ['id', 'name', 'price', 'category'];
  fieldsProduct: string[] = ['ID', 'NOME', 'PREÇO', 'CATEGORIA'];
  
  cartProducts = Array<productCart>();
  teste = signal<Iproduct[]>([]);

  public products: Array<product> = [];
  $quantity = signal<number>(0);
  q: number = 0;
  editQuantity: number | undefined;
  index: number = 0;
  
  PrudctService = inject(ProductsService);

  ngOnInit() {
    this.loadProducts();
    this.teste();
  }

  loadProducts(){
    this.PrudctService.getAllProducts().subscribe(products => {
      this.products.push(...products);
    });
  }

  addToCart(product: any){
    // this.teste.set([...this.teste(), product]);


    if(this.cartProducts.length === 0){
      this.cartProducts.push(product);
    }

    else{
      let exist = true;
      //Verificar se o item existe
      for( let i = 0; i < this.cartProducts.length; i++){
        //Alterar quantidade de um item
        if(this.cartProducts[i].name == product.name){          
          this.cartProducts[i].quantity = product.quantity;
          exist = false;
        }
      }
      //Add item
      if(exist){          
        this.cartProducts.push(product);
        // this.teste.set([...this.teste(), product]);
      }
    }
    console.log(this.teste());      
  }

  totalAmount(): number{
    let totalAmount: number = 0
    for(let item of this.cartProducts){
      totalAmount += item.price * item.quantity;
    }
    return totalAmount
  }

  editQuantityProduct(){    
    this.cartProducts[this.index].quantity = this.editQuantity ? this.editQuantity : 0;
    this.editQuantity = undefined;

    console.log(this.cartProducts);
  }

  selectItem(item: any){
  }

  deletProduct(){
    this.cartProducts.splice(this.index, 1);

    console.log(this.cartProducts);
  }

  finishSale() {
    try {
      
    } catch (error) {
      
    }
  }
  pendingSale() {
    try {
      
    } catch (error) {
      
    }
  }
  cancelSale() {
    this.cartProducts = [];
  }
}
export interface Iproduct{
  id: string;
  name: string;
  price: number;
  category: string;
}