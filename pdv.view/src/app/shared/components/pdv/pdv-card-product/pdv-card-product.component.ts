import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { productCart } from '../../../../models/productCart.model';
import { product } from '../../../../models/product.model';

@Component({
  selector: 'app-pdv-card-product',
  standalone: true,
  imports: [],
  templateUrl: './pdv-card-product.component.html',
  styleUrl: './pdv-card-product.component.css'
})
export class PdvCardProductComponent implements OnInit{

  @Input() 
  products: Array<product> = [];
  
  @Output() 
  productSelected = new EventEmitter<any>();

  public quantity = signal<number>(0);

  ngOnInit(){
  }

  quantityProduct(quantity: number) {
    this.quantity.update((q) => q + quantity);
  }

  addToCart(product: product) {
    let prod: productCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: this.quantity(),
      category: product.category
    }

    this.productSelected.emit(prod);
    this.quantity.set(0);
  }
}
