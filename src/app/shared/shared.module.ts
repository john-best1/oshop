import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    ProductCardComponent, 
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NgbModule.forRoot(),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule, 
  ],
  exports: [
    ProductCardComponent, 
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NgbModule.forRoot().ngModule,
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule, 
  ],
  providers:[
    AuthService,
    AuthGuard,
    UserService,
    AngularFireDatabase,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],

})
export class SharedModule { }
