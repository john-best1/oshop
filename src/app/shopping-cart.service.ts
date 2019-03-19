import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map(x => 
      new ShoppingCart(x.payload.exportVal().items)
    ));
  }
  
  async addToCart(product: Product){
    this.updateItem(product, product.$key, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, product.$key, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create(){
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId, productId) : Observable<any>{
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
  }

  private getItem2(cartId, productId){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }


  private async updateItem(product: Product, id: string, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, id); 
    let item$$ = this.getItem2(cartId, id);
    item$.pipe(take(1)).subscribe(item => {
      if (item === null){
        item$$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1})
      }else{
        let quantity = (item.quantity + change)
        if(quantity === 0) item$$.remove();
        else item$$.update({quantity: item.quantity + change});
      }
    });
  }
}
