import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
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

  async addToCart(product: Product, id: string){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, id); 
    let item$$ = this.getItem2(cartId, id);
    item$.pipe(take(1)).subscribe(item => {
      if (item === null){
        item$$.set({product: product, quantity: 1})
      }else{
        item$$.update({quantity: item.quantity + 1});
      }
    });
  }
}
