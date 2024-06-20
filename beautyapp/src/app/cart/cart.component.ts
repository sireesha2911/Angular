import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart-item.model';
import { BeautyProduct } from '../models/beauty-product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { item: CartItem, product: BeautyProduct }[] = [];
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartItems();
    this.cartSubscription = this.cartService.getCartUpdates().subscribe(() => {
      this.updateCartItems();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  updateCartItems(): void {
    this.cartService.getCartItemDetails().subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.quantity - 1);
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.item.quantity, 0);
  }
}
