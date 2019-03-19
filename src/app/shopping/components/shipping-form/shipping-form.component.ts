import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping : any = {}; 
  userId: string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor(private authService: AuthService, private router: Router,
    private orderService: OrderService) { }

  
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
}  

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }


}
