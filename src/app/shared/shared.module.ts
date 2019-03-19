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

@NgModule({
  declarations: [
    ProductCardComponent, 
    ProductQuantityComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductCardComponent, 
    ProductQuantityComponent
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
  ]
})
export class SharedModule { }
