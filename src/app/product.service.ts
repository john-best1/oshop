import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { Product } from './models/product';
import { map } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges()
}

getAll2(): Observable<Product[]> {
  return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
          map(changes =>
              changes.map(c => {
                  const data = c.payload.val() as Product;
                  const $key = c.payload.key;
                  return { $key, ...data };
              })
          )
      );
}


  getAllVal(){
    return this.db.list('/products').valueChanges();
  }

  getProduct(productId){
    return this.db.object('/products/' + productId);
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
