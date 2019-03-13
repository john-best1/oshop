import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }

  //getAll2(): Observable<Product[]> {
 //   return this.db.list<Product>('/products')
  //      .snapshotChanges()
  //      .pipe(
 //           map(changes =>
  //              changes.map(c => {
  //                  const data = c.payload.val() as Product;
   //                 const id = c.payload.key;
  //                  return { id, ...data };
  //              })
//            )
//        );
//  }
}
