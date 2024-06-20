import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item.model';
import { BeautyProduct } from './models/beauty-product.model';
import { BeautyService } from './beauty.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.cartItems);
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private beautyService: BeautyService) {
    // Initialize cartItems from localStorage if available
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
      this.updateCartItemCount();
    }
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(ci => ci.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCart();
    this.updateCartItemCount();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartItemDetails(): Observable<{ item: CartItem, product: BeautyProduct }[]> {
    return this.beautyService.getProducts().pipe(
      map((products: BeautyProduct[]) => {
        return this.cartItems.map((item: CartItem) => ({
          item,
          product: products.find(p => p.id === item.productId)!
        }));
      })
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(ci => ci.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next(this.cartItems);
      this.saveCart();
    }
    this.updateCartItemCount();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(ci => ci.productId !== productId);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCart();
    this.updateCartItemCount();
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCart();
    this.updateCartItemCount();
  }

  private saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private updateCartItemCount(): void {
    this.cartItemCountSubject.next(this.cartItems.length);
  }

  getCartUpdates(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getCartItemCountObservable(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }
}
