import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product : Product;
  @Input('show-actions') showActions = true;
  @Input('height') height: number = 200;
  @Input('width') width: number = 200;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product, id: string){
    this.cartService.addToCart(product, id);
  }

  getQuantity(id:string){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[id];
    return item ? item.quantity : 0;
  }


}
